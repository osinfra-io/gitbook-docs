---
sidebar_label: Gateway Authentication
---

# Gateway Authentication

Pneuma enforces authentication and authorization for external application routes at the shared gateway. Teams declare route-level intent in Logos; Pneuma renders the required Istio and Authentik resources before traffic reaches a workload cluster.

:::tip Architecture Decision Records

This page includes [Architecture Decision Records](#architecture-decision-records) documenting the key design decisions.

:::

## Architecture

Gateway auth runs on the Pneuma gateway data plane (`gateway-istio`). It combines Authentik browser-session enforcement, Istio JWT validation for API clients, and Envoy external authorization so application teams do not need to operate an ingress authentication stack.

Authentik is the platform identity provider. It is available at `authentik.<env>.osinfra.io`; production omits the environment segment. The `pt-pneuma` `authentik` and `authentik-config` workspaces deploy and configure it through `pt-arche-kubernetes-authentik`. Authentik stores persistent data in Cloud SQL PostgreSQL, and its embedded outpost provides the Envoy `ext_authz` endpoint for browser sessions.

Browser identity does not reach the workload as a bearer JWT. After the embedded outpost authorizes the session, the gateway forwards trusted Authentik identity headers such as `x-authentik-username`, `x-authentik-email`, `x-authentik-name`, `x-authentik-uid`, `x-authentik-groups`, and `x-authentik-entitlements`. Workloads behind a `browser` route use these gateway-controlled headers when they need the signed-in user's identity.

```mermaid
flowchart TD
    classDef client fill:#5F6368,stroke:#5F6368,color:#fff
    classDef gcp fill:#4285F4,stroke:#4285F4,color:#fff
    classDef istio fill:#466BB0,stroke:#466BB0,color:#fff
    classDef authentik fill:#FD4B2D,stroke:#FD4B2D,color:#fff
    classDef kubernetes fill:#326CE5,stroke:#326CE5,color:#fff
    classDef logos fill:#2E7D32,stroke:#2E7D32,color:#fff
    classDef decision fill:#F9AB00,stroke:#F9AB00,color:#202124

    Client([User or API client]):::client --> Armor[Cloud Armor]:::gcp
    Armor --> Gateway[Pneuma gateway]:::istio
    Gateway --> Mode{Auth mode}
    Mode:::decision -->|browser| Outpost[Authentik embedded outpost]:::authentik
    Mode -->|api-jwt| JWT[Istio JWT validation]:::istio
    Mode -->|public| Route[Gateway API HTTPRoute]:::kubernetes
    Outpost -->|x-authentik-* identity headers| Route
    JWT --> Route
    Route --> Mesh[Service mesh]:::istio
    Mesh --> Workload[Team workload]:::kubernetes

    Logos[Logos route_auth_policies]:::logos --> Pneuma[Pneuma rendering]:::gcp
    Pneuma --> Gateway
    Authentik[Authentik]:::authentik --> Outpost
    Authentik --> JWT
```

## Components

| Component | Owner | Description |
|---|---|---|
| Logos `route_auth_policies` | Logos | Source of truth for route-level auth intent. Policies are keyed by an existing route name. |
| Authentik | Pneuma via Arche | Platform OIDC provider and identity layer deployed on the gateway clusters. |
| Embedded outpost | Pneuma via Arche | Forward-auth endpoint for browser sessions. Istio registers it as the `authentik` external authorization provider and forwards its trusted `x-authentik-*` identity headers to authorized workloads. |
| Authentik applications and policies | Pneuma via Arche | Per-host application, proxy provider, and policy bindings generated from browser-route group and role requirements. |
| Istio `RequestAuthentication` | Pneuma | Validates bearer JWTs against the Authentik issuer and JWKS. |
| Istio `AuthorizationPolicy` | Pneuma | Sends browser requests to Authentik or enforces API JWT claims natively. |

## Request Flow

1. Cloud Armor evaluates edge security policy.
2. TLS terminates at the shared gateway.
3. The route's auth mode determines enforcement:
   - `browser` sends the request to the Authentik embedded outpost, which validates the browser session and returns trusted `x-authentik-*` identity headers for the upstream request.
   - `api-jwt` has Istio validate the bearer JWT against the Authentik JWKS, then evaluates the validated principal and claims.
   - `public` skips auth enforcement.
4. Gateway API routes Authentik callbacks to the embedded outpost and application traffic to the team service.
5. Mesh mTLS and workload authorization protect traffic after it enters the service mesh.

:::warning Fail-closed by default

Enforced routes do not fail open. Configuration with an unknown or incomplete auth mode is rejected before deployment. If the browser authorization service is unavailable, the gateway denies the request.

:::

## Auth Modes

Each `route_auth_policies` entry selects one of three modes. The default is `browser`.

| Mode | Purpose | Required fields | Forbidden fields |
|---|---|---|---|
| `public` | No authentication — the route is open | none | `audiences`, `public_paths`, `required_groups`, `required_roles` |
| `browser` | Interactive Authentik SSO for human users | at least one of `required_groups` / `required_roles` | `audiences` |
| `api-jwt` | Machine-to-machine bearer JWT validation | at least one `audiences` value | none |

For claim lists, matching is **OR within a list** and **AND across lists**. For example, a route with two audiences and one required role accepts either audience, but the role must also match.

For browser routes, Pneuma represents both `required_groups` and `required_roles` as Authentik group-backed policy bindings. Because Authentik forward-auth applications are host-scoped, every browser route for a team must use identical `required_groups` and `required_roles`; Logos rejects conflicting browser requirements across routes on the same team host. API JWT routes evaluate the corresponding `groups` and `roles` token claims directly.

## Browser Identity Headers

The browser contract ends at the trusted headers injected after Authentik authorizes the request. Applications must not expect an Authentik JWT on a `browser` route. The gateway authorization integration controls the `x-authentik-*` namespace so values supplied directly by an external client are not a trusted identity source.

Common headers include the authenticated username, email, display name, stable user ID, groups, and entitlements. Applications should consume only the fields they require and continue to rely on the gateway to enforce the route's declared group and role policy.

## Declaring a Policy

Teams declare auth intent in Logos beside the corresponding route. `route_auth_policies` is keyed by route name and is valid only in a mesh-enabled namespace.

```hcl
namespaces = {
  "api" = {
mesh_enabled = true

    route_auth_policies = {
      "api" = {
        mode            = "browser"
        public_paths    = ["/api/healthz"]
        required_groups = ["platform-engineers"]
      }
    }

    routes = {
      "api" = {
        path    = "/api"
        port    = 8080
        service = "api-service"
      }
    }
  }
}
```

| Field | Description |
|---|---|
| `mode` | Optional. `public`, `browser`, or `api-jwt`; defaults to `browser`. |
| `audiences` | JWT audiences accepted by an `api-jwt` route. Required for `api-jwt` and forbidden for other modes. |
| `public_paths` | Unauthenticated paths beneath an enforced route. Entries must start with `/` and cannot be `/`, `/*`, or `*`. Append `/*` to a concrete path to exempt a subtree, such as `/api/healthz/*`. |
| `required_groups` | Authentik groups accepted by the route. |
| `required_roles` | Authentik application roles accepted by the route. |

Use the [Nomos Agent](/onboarding) to create or update the Logos declaration. Nomos validates the policy before opening the change.

## Browser Auth Limitations

### Team-owned group contract

Logos supports explicit per-environment application-access declarations through [`authentik_groups`](../logos/team-topology.md#authentik-application-access-declarations). Group names include the owning Team Topologies key and preserve application branding, for example `pt-pneuma: agentgateway Admins`. These names contain spaces; group matching must compare whole names, not space-separated words.

The reusable Authentik configuration accepts resolved application groups. Its Google source mapping assigns membership from a verified OAuth email during enrollment and sign-in, while configuration deployment reconciles already-verified Google users. Declared identities that have not completed verified enrollment are reported as pending; no accounts or passwords are pre-provisioned. Application groups are non-superuser groups and do not inherit ordinary team membership.

The proposed cloud Authentik workspace exposes `pending_application_members`, keyed by stable team/group identifiers, for members awaiting verified Google enrollment. This email-bearing output is sensitive and suppressed in ordinary output; inspect it only through approved state-access procedures, never by copying identities into public workflow logs or PR comments. An empty pending list does not establish route authorization or prove a successful browser test.

Consumer deployment and request-level authorization remain separate rollout requirements. Do not infer same-host path isolation or existing-session revocation from group synchronization alone. Until those are verified, retain the restrictions below and do not activate differently authorized browser paths on one host.

The checked-out local fixtures consume Pneuma's actual Logos declaration and select its sandbox member list. Their shared gateway renderer strips inbound identity headers, authenticates with `ext_authz`, and then enforces managed requirements against the current declared emails. The Authentik proxy mapping supplies a dedicated Google-established identity header; an ordinary email header or cached application-group claim cannot grant managed access. The guard protects the UI and its supporting admin paths without adding implicit public health exceptions.

This local integration is not a cloud rollout. Real Google browser sign-in, independent-path allow/deny checks, and removal with an existing session must pass before releasing modules or relaxing the cloud host-scoping restriction. After rollout, membership changes require Logos deployment followed by the relevant manually dispatched Pneuma reconciliation workflows; merging a declaration alone does not change live access.

The proposed cloud gateway adapter selects application memberships from `module.core_helpers.teams` using the current long environment name and passes them to the same shared renderer. It creates a cluster-owned post-auth guard only when a browser route requires a managed group; existing browser and API JWT routes retain their current behavior. This adapter does not itself expose the agentgateway UI.

For temporary branch testing, the Pneuma feature branch pins Authentik and Istio to immutable, unreleased feature-branch commits. The Authentik consumer passes environment-selected application groups through the same team-access adapter. These test pins must be replaced by released post-merge SHAs before promotion; they do not establish a cloud deployment or activate UI routes.

Sandbox agentgateway deployment uses separate zonal runtime and manifest workspaces. Runtime runs after Istio and installs the controller and CRDs; the separate manifests workspace owns only `AgentgatewayParameters`, whose schema must exist before planning. It waits for Authentik configuration before enabling the proxy's admin listener. Both stages target only Pneuma-owned sandbox clusters. Jobs use dedicated approval environments managed through Logos: `Sandbox agentgateway: <zone>` for runtime and `Sandbox agentgateway Manifests: <zone>` for manifests, with `pt-pneuma-sandbox-approvers` as reviewers.

The proposed admin endpoint mirrors Authentik's dedicated-host implementation: `agentgateway.sb.osinfra.io` is added to the same Corpus-owned environment DNS zone and shared global gateway DNS/certificate inputs. It does not receive a team-apex or zonal hostname. The Istio manifests workspace routes that host to the ClusterIP-only `agentgateway-proxy-admin` Service on port `15000`. Its entire `/` path requires `pt-pneuma: agentgateway Admins`; only the more-specific Authentik outpost callback path bypasses this requirement. Authentik creates a dedicated host-scoped provider/group binding, and the shared request guard checks current declared memberships after authentication.

The Istio manifests workspace owns the admin Service, routes, and authorization policies together. It creates the Service only after the ingress-only mesh policies and browser authorization filters are applied. Mesh policies allow only the Istio ingress service-account principal to reach the admin port and explicitly deny all other principals. No direct public admin load balancer is created. This platform-owned route is distinct from stream-aligned teams' Logos namespace routes, while consuming the same team-owned membership contract. Exposure is sandbox-only until the cloud flow is verified; no non-production or production hostname or admin deployment is enabled by this change.

:::caution Released consumer rollout remains pending

The released Pneuma consumer does not yet synchronize the new Logos application-group contract. The feature-branch test configuration wires this contract to an unreleased Authentik commit, but merging a declaration alone does not deploy it. Existing unmanaged groups still require direct membership assignment until migrated. This rollout is tracked in [pt-pneuma#181](https://github.com/osinfra-io/pt-pneuma/issues/181).

:::

:::caution Policies are scoped per host

Browser applications and policy bindings are scoped to a host, not an individual path. If two browser routes on the same host declare different requirements, Authentik's `Any` policy-engine mode allows a user who satisfies either policy to access both routes. This gap is tracked in [pt-pneuma#183](https://github.com/osinfra-io/pt-pneuma/issues/183).

:::

## Verification

The platform `istio-test` route exposes separate public probes and a protected browser-identity diagnostic:

| Request | Expected result |
|---|---|
| `/istio-test/health` without an Authentik session | Public health JSON response; no Authentik redirect |
| `/istio-test/metadata/cluster-name` without an Authentik session | Public metadata response; no Authentik redirect |
| `/istio-test/auth` without an Authentik session | Redirect to Authentik |
| `/istio-test/auth` after signing in as a member of `all` | JSON diagnostic showing the trusted `x-authentik-*` identity headers received by the workload |

The route uses `mode = "browser"` and `required_groups = ["all"]`. `/istio-test/health` and the metadata endpoints are explicitly included in `public_paths` so infrastructure health and metadata checks remain anonymous. These public checks should return their application response directly; a redirect to Authentik means the public-path bypass is not working. `/istio-test/auth` is intentionally protected and makes the browser identity handoff observable without requiring another application to implement a diagnostic endpoint.

OAuth callback requests under `/outpost.goauthentik.io` are routed directly to the embedded outpost on every protected browser host. This routing is required for the browser flow to return to the original application.

### Optional pre-sandbox checks

Developers can use `/platform-grouping:test-local-gateway-stack` for complex browser-auth and gateway configuration changes. This is an optional local integration workflow, not an additional CI or pre-push requirement.

The Kubernetes fixture exercises both direct Istio routing and the Istio-to-agentgateway-to-workload path, using the checked-out configuration modules. Full verification includes real Google sign-in, the trusted identity JSON, public-path bypasses, denial of forged identity headers, and ambient mTLS. An HTTP redirect alone does not establish end-to-end success. See [Module Development](../arche/module-development.md#optional-local-integration-tests) for the shared fixture convention and cloud-parity limits.

Pneuma's `regional/authentik-config/authentication` child module owns the sandbox brand, custom flow, four stage bindings, two conditional password/MFA policy bindings, and shared identification settings. Both the cloud root and local Authentik fixture call it, so local iteration exercises the actual sandbox CSS and authentication-stage wiring, not an independent visual approximation. The existing built-in identification stage is managed by Arche using those shared settings and reused in the custom flow. Domain and titles are explicit caller inputs; local values are `authentik.localhost` and Development titles.

Cloud stage/policy discovery, imports, Google credentials, groups, and environment enablement remain in the cloud root. Custom-flow creation remains sandbox-only; production and non-production still manage the default identification stage without creating the sandbox brand. Root `moved.tofu` blocks preserve all four resource families during extraction, and the fixture moves its existing Development brand into the shared module. Local verification checks the live brand, flow, stage/policy bindings, and identification settings against applied configuration; Google browser verification remains a separate requirement.

## Ownership Boundaries

| Boundary | Responsibility |
|---|---|
| Application teams | Declare routes and auth intent in Logos; own application behavior behind the gateway. |
| Logos | Stores the team, namespace, route, and `route_auth_policies` contract. |
| Pneuma | Renders and operates gateway routing, Authentik, Istio auth policy, RBAC, and admission guardrails. |
| Arche | Provides the reusable `pt-arche-kubernetes-authentik` deployment and configuration module. |
| Techne | Provides schema tooling and the Nomos self-service workflow. |

## Operational Expectations

- Unauthenticated requests to enforced application paths are denied before reaching a team backend.
- The `istio-test` health and metadata diagnostics, Authentik callbacks, and other declared `public_paths` bypass enforcement without redirecting to Authentik.
- Route-auth changes deploy through the normal Logos-to-Pneuma pipeline.
- Pneuma owns Authentik availability, Cloud SQL persistence, and gateway auth observability.
- Browser authorization depends on current Authentik group and role membership.

## Core Invariants

- Auth intent is declared in Logos, not in team-managed gateway resources.
- Enforced routes fail closed.
- `browser` requires at least one group or role; `api-jwt` requires at least one audience.
- Public bypasses cannot expose an entire route using `/`, `/*`, or `*`.
- API JWT validation occurs at the gateway before authorization.
- Browser identity reaches workloads only through gateway-controlled Authentik headers after the session is authorized.

## Architecture Decision Records

### Centralized Gateway Authentication Enforcement

<table>
  <thead>
    <tr><th>Status</th><th>Date</th><th>Deciders</th></tr>
  </thead>
  <tbody>
    <tr><td>Accepted ✅</td><td>July 2026</td><td>Pneuma, Logos, Techne</td></tr>
  </tbody>
</table>

#### Context and Problem Statement

External team services need consistent authentication and authorization without every team operating its own ingress auth stack. If each team owned identity clients, forward-auth instances, Istio auth policies, and gateway resources directly, the platform would drift into inconsistent fail-open behavior and unclear ownership during incidents.

#### Decision

Centralize authn/authz at Pneuma gateway clusters. Logos remains the contract where teams declare route-auth intent; Pneuma consumes that contract and renders Authentik, the embedded-outpost ext_authz path, Istio JWT validation, and Istio authorization policy centrally. Arche packages the reusable Authentik module, and Techne provides the schema and Nomos authoring flow.

#### Alternatives Considered

- **Team-managed gateway auth resources** — Rejected. Direct Kubernetes ownership would bypass the reviewed Logos contract and make route isolation, fail-closed behavior, and incident ownership inconsistent.
- **Per-application forward-auth proxies** — Rejected. Duplicates auth infrastructure in every app, complicates upgrades, and does not protect requests before they enter workload clusters.
- **Application-only authorization** — Rejected. Leaves unauthenticated traffic to reach teams and makes centralized denial observability impossible.

#### Consequences

- Teams get a self-service auth contract without owning gateway internals.
- Pneuma is the single operational owner for gateway auth availability, denial behavior, and observability.
- Schema validation in Techne and PR review in Logos become part of the security boundary.
- Gateway auth outages deny enforced traffic instead of failing open.

### Per-Host Browser Group and Role Enforcement

<table>
  <thead>
    <tr><th>Status</th><th>Date</th><th>Deciders</th></tr>
  </thead>
  <tbody>
    <tr><td>Accepted ✅</td><td>September 2026</td><td>Pneuma, Arche</td></tr>
  </tbody>
</table>

#### Context and Problem Statement

`browser`-mode routes validated only that a user had an authenticated Authentik session — the declared `required_groups` and `required_roles` on a route's `route_auth_policies` had no enforcement path. Any authenticated user could reach a `browser` route regardless of group or role membership, because no Authentik application, provider, or policy binding existed to evaluate those claims for a specific host.

#### Decision

Pneuma's `authentik-config` workspace renders one Authentik application and proxy provider per gateway host plus policy bindings for the declared browser principals. Because the embedded outpost authorizes an authenticated session against that host-scoped application rather than re-evaluating application policies for every route request, all browser routes for a team must declare identical `required_groups` and `required_roles`. Logos and Pneuma validate this invariant and reject conflicting route policies instead of silently widening access.

The one remaining manual step — provisioning **Authentik group membership** itself from Logos/Google Identity groups — is out of scope for this decision and is tracked separately as [pt-pneuma#181](https://github.com/osinfra-io/pt-pneuma/issues/181).

#### Alternatives Considered

- **Manual per-route Authentik configuration** — Rejected. Requires an operator to hand-configure an application, provider, and policy binding in the Authentik UI for every enforced route, which does not scale, is not reviewable through Logos, and is easy to forget or get wrong.
- **Path-aware Authentik application policies on one host** — Rejected. The embedded outpost reuses its authenticated session for subsequent requests, so an application policy evaluated during authorization is not a reliable per-request path enforcement point.
- **Multiple single-application providers for the same host** — Rejected. Authentik selects forward-auth applications by host, so same-host providers cannot reliably represent distinct route policies.
- **Enforcing groups/roles entirely in Istio via JWT claims** — Rejected. Authentik's browser flow issues a session, not a JWT with claims usable by Istio's native `AuthorizationPolicy`; enforcement has to happen at the Authentik layer for interactive sessions.

#### Consequences

- `browser` routes with `required_groups` / `required_roles` are enforced consistently at the shared host boundary.
- Teams cannot assign different browser group or role requirements to routes on the same gateway host; they must align the requirements or use another auth mode.
- Authorized browser identity is forwarded to workloads through trusted `x-authentik-*` headers rather than an application-facing JWT.
- Adding or changing browser requirements remains a Logos change, but validation prevents configurations that the host-scoped Authentik model cannot enforce safely.
- Authentik group membership sync remains an open gap ([pt-pneuma#181](https://github.com/osinfra-io/pt-pneuma/issues/181)) — enforcement is only as strong as the manual group assignments behind it until that is resolved.
