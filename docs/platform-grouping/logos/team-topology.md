---
sidebar_label: Team Topology
---

import SchemaViewer from '@site/src/components/SchemaViewer';

# Team Topology

Logos codifies the team structure that all platform tooling — GitHub, GCP, and Datadog — reflects. Every team, its repositories, and its observability scope are defined here and flow downstream.

- **GitHub teams**: Hierarchical parent/child teams with membership and repository access managed as code; four standard child teams (sandbox-approvers, non-production-approvers, production-approvers, repository-administrators) are created for every team
- **GitHub repositories**: Repositories are registered in pt-logos and provisioned with standard settings — squash-only merges, repository rulesets enforcing PR reviews and signed commits, Datadog webhooks, and standard repository files (release notes config, security policy)
- **Datadog teams**: Observability team structure mirrors GitHub teams; each team gets a service account with a per-team API key and app key stored as GitHub Actions secrets in that team's repositories

## Team Configuration Schema

Each team is defined as an entry in the `teams` map inside a `.tfvars` file under `teams/`. The schema below documents every available field — click any object or map to expand its properties.

<SchemaViewer title="teams.<team-key>" />

### Authentik application-access declarations

`authentik_groups` declares team-owned application-access groups independently of ordinary team membership. Logos stores the contract; it does not connect to Authentik. Pneuma consumes the declarations through core helpers and owns runtime reconciliation.

Use a stable slug key and a human-readable application/role label. The group name is derived as `<team-key>: <label>`, for example **`pt-pneuma: agentgateway Admins`** or **`st-ethos: Reports Readers`**. Preserve application branding in the label. The `pt-`/`st-` prefix identifies the Team Topologies type; `Admins` describes application access and does not grant Authentik administrative privileges.

```hcl
authentik_groups = {
  agentgateway-admins = {
    description = "Access to the agentgateway administration UI"
    label       = "agentgateway Admins"

    members = {
      non-production = []
      production     = []
      sandbox        = ["member@example.com"]
    }
  }
}
```

Member emails are lowercase, unique within each environment, and explicit. An omitted environment has no members. Joining a team never implicitly grants application access. Labels must be unique within the owning team; changing a label requires updating matching route references, while the stable slug remains unchanged.

:::caution Runtime rollout

The declaration and reusable membership module do not by themselves enable new application routes. A consumer must use a released module implementing the contract. After Logos deployment, reconcile the selected environment through Pneuma's existing manually dispatched workflow and environment approvals; a merged Logos PR is not evidence that access has changed.

The current [browser policy limitations](../pneuma/gateway-authentication.md#browser-auth-limitations) remain in force until request-level isolation and existing-session revocation are implemented and verified.

:::

## Components

| Component | Description |
|---|---|
| `team` | A platform or stream-aligned team with a name, type, and member list |
| `github-team` | A GitHub team mirroring the Logos team — controls repo access |
| `repository` | A GitHub repository registered in Logos with standard settings and branch protection |
| `branch-protection` | Rules applied to default branch: required reviews, status checks, no force push |
| `datadog-team` | An observability team in Datadog mirroring the Logos team — owns dashboards and monitors |

## Core Invariants

- Every team definition produces exactly one set of GCP, GitHub, and Datadog resources.
- Every provisioned GitHub repository has signed commits required, linear history enforced, and PR review active — the branch ruleset is hardcoded with `enforcement = "active"` and no variable to disable it.
