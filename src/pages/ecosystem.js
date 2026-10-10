import React from 'react';
import Layout from '@theme/Layout';
import styles from './ecosystem.module.css';

const categories = [
  {
    id: 'foundation',
    label: 'Foundation & Runtime',
    description: 'Where platform infrastructure and workloads run.',
    tools: [
      {
        name: 'Google Cloud Platform',
        logo: '/img/google-cloud.svg',
        description: 'Cloud infrastructure for projects, networking, identity, encryption, and billing.',
        href: 'https://cloud.google.com',
      },
      {
        name: 'Google Kubernetes Engine',
        logo: '/img/gke.svg',
        description: 'Managed Kubernetes runtime across zones and regions with workload identity and fleet management.',
        href: 'https://cloud.google.com/kubernetes-engine',
      },
      {
        name: 'Docker',
        logo: '/img/docker.png',
        description: 'Container packaging and consistent local development environments.',
        href: 'https://www.docker.com',
      },
    ],
  },
  {
    id: 'traffic',
    label: 'Traffic & Trust',
    description: 'How requests reach applications and establish trusted connections.',
    tools: [
      {
        name: 'Istio',
        logo: '/img/istio.png',
        description: 'Service mesh for encrypted workload traffic, gateway routing, and locality-aware load balancing.',
        href: 'https://istio.io',
        cncf: true,
      },
      {
        name: 'agentgateway',
        logo: '/img/agentgateway.svg',
        description: 'AI-native data plane for MCP, agent-to-agent, and LLM traffic.',
        href: 'https://agentgateway.dev',
        lf: true,
      },
      {
        name: 'Authentik',
        logo: '/img/authentik.svg',
        description: 'Identity provider for OIDC and authenticated browser access at the gateway.',
        href: 'https://goauthentik.io',
      },
      {
        name: 'cert-manager',
        logo: '/img/cert-manager.png',
        description: 'Automated TLS certificate issuance and renewal for Kubernetes workloads.',
        href: 'https://cert-manager.io',
        cncf: true,
      },
    ],
  },
  {
    id: 'operations',
    label: 'Security & Operations',
    description: 'How the platform protects resources and keeps workloads healthy.',
    tools: [
      {
        name: 'OpenBao',
        logo: '/img/openbao.svg',
        description: 'Secrets management, dynamic credentials, and PKI certificate issuance.',
        href: 'https://openbao.org',
        lf: true,
      },
      {
        name: 'OPA Gatekeeper',
        logo: '/img/opa.png',
        description: 'Kubernetes admission policies that prevent non-compliant resources from being deployed.',
        href: 'https://open-policy-agent.github.io/gatekeeper',
        cncf: true,
      },
      {
        name: 'Datadog',
        logo: '/img/datadog.png',
        description: 'Observability, security monitoring, and cloud cost management.',
        href: 'https://datadoghq.com',
      },
      {
        name: 'Nuclei',
        logo: '/img/nuclei.svg',
        description: 'Template-based vulnerability scanning of platform endpoints and APIs.',
        href: 'https://projectdiscovery.io/nuclei',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery & Developer Experience',
    description: 'How teams build, validate, and deliver platform changes.',
    tools: [
      {
        name: 'OpenTofu',
        logo: '/img/opentofu.png',
        description: 'Infrastructure as code across cloud resources and Kubernetes configuration.',
        href: 'https://opentofu.org',
        cncf: true,
      },
      {
        name: 'Helm',
        logo: '/img/helm.svg',
        description: 'Kubernetes package management for platform components and cluster add-ons.',
        href: 'https://helm.sh',
        cncf: true,
      },
      {
        name: 'GitHub Actions',
        logo: '/img/githubactions.png',
        description: 'Shared workflows for consistent, auditable deployments using OIDC authentication.',
        href: 'https://github.com/features/actions',
      },
      {
        name: 'Dependabot',
        logo: '/img/dependabot.png',
        description: 'Automated updates for pinned dependencies across platform repositories.',
        href: 'https://docs.github.com/en/code-security/dependabot',
      },
      {
        name: 'pre-commit',
        logo: '/img/pre-commit.svg',
        description: 'Formatting, validation, documentation, and security checks before commits.',
        href: 'https://pre-commit.com',
      },
      {
        name: 'GitHub Copilot',
        logo: '/img/githubcopilot-white.svg',
        description: 'AI-assisted development and team-level agents for platform workflows.',
        href: 'https://github.com/features/copilot',
      },
      {
        name: 'Docusaurus',
        logo: '/img/docusaurus.svg',
        description: 'Platform documentation published through GitHub Pages.',
        href: 'https://docusaurus.io',
      },
    ],
  },
];

function ToolCard({ name, logo, description, href, cncf, lf }) {
  return (
    <a href={href} className={styles.card} target="_blank" rel="noopener noreferrer">
      <div className={styles.logoWrapper}>
        <img src={logo} alt={name} className={styles.logo} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
        {cncf && (
          <img src="/img/cncf.png" alt="CNCF" className={styles.cncfBadge} title="CNCF Project" />
        )}
        {lf && (
          <img src="/img/linux-foundation.svg" alt="Linux Foundation" className={styles.lfBadge} title="Linux Foundation Project" />
        )}
      </div>
    </a>
  );
}

export default function Ecosystem() {
  return (
    <Layout title="Ecosystem" description="The tools and infrastructure that power the osinfra.io platform.">
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ecosystem</h1>
          <p className={styles.subtitle}>
            The tools and infrastructure behind the platform, organized by the capabilities they provide.
          </p>
        </div>

        <div className={styles.content}>
          {categories.map((category) => (
            <section key={category.id} className={styles.section} aria-labelledby={category.id}>
              <h2 id={category.id} className={styles.categoryLabel}>{category.label}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
              <div className={styles.grid}>
                {category.tools.map((tool) => (
                  <ToolCard key={tool.name} {...tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
