---
description: >-
  Google Cloud Kubernetes Engine platform to run scalable, production-ready enterprise workloads.
---

# Kubernetes

<figure><img src="../../../.gitbook/assets/google-kubernetes-engine.png" alt="" width="256"><figcaption></figcaption></figure>

A modular and scalable configuration that enables organizations to adopt Google Cloud Kubernetes Engine for their business needs. Kubernetes Engine is a managed, production-ready environment for deploying containerized applications.

## Service Interfaces 🔩

* [Add or update Kubernetes namespaces](https://github.com/osinfra-io/google-cloud-kubernetes/issues/new?assignees=&labels=enhancement%2Cgood+first+issue&projects=&template=add-update-k8s-namespace.yml&title=%F0%9F%94%A9+Add+or+update+Kubernetes+namespaces)

## Response Times 🕙

* Responsible team: [Platform - Google Cloud Kubernetes](https://github.com/orgs/osinfra-io/teams/platform-google-cloud-kubernetes)
* Response time for incidents: `60 minutes`
* Response time for other incidents: `120 minutes`
* Response time for support: `60 minutes`
* Response time for feedback: `30 minutes`

## Roadmap 🗺️

* Link to the roadmap: [GitHub Project](https://github.com/orgs/osinfra-io/projects/1/views/7)

## Communication Channels 🗨️

{% tabs %}
{% tab title="Possible incident" %}
Contact exclusively via:

* Discord: [Platform - Google Cloud Kubernetes](https://discord.gg/YPg4AmMDvF)
* Phone number:
{% endtab %}

{% tab title="Support or provide feedback" %}
Contact via any of these:

* Discord: [Platform - Google Cloud Kubernetes](https://discord.gg/YPg4AmMDvF)
* Email address: [platform-google-cloud-landing-zone@osinfra.io](mailto:platform-google-kubernetes@osinfra.io)
* Phone number:
* Office hours (EST): `Weekdays 5:00PM - 10:00PM` `Weekends 8:00AM - 5:00PM`
{% endtab %}
{% endtabs %}

## Platform Modules 🏗️

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center">Audit Logging</td><td>This repository manages centralized audit logging resources. Google Cloud services write audit logs that record administrative activities and access within your Google Cloud resources. <a href="https://cloud.google.com/logging/docs/audit">Audit logs</a> help you answer "who did what, where, and when?" within your Google Cloud organization.</td><td><a href="../../../.gitbook/assets/cloud-audit-logs-card.png">cloud-audit-logs-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-audit-logging">https://github.com/osinfra-io/google-cloud-audit-logging</a></td></tr><tr><td align="center">Resource Hierarchy and IAM</td><td>This repository manages a resource hierarchy and IAM. Metaphorically speaking, the <a href="https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy">Google Cloud resource hierarchy</a> resembles the file system found in traditional operating systems to organize and manage entities hierarchically. <a href="https://cloud.google.com/iam">Identity and Access Management (IAM)</a> lets administrators authorize who can take action on specific resources, giving you complete control and visibility to manage Google Cloud resources centrally.</td><td><a href="../../../.gitbook/assets/administration-card.png">administration-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-hierarchy">https://github.com/osinfra-io/google-cloud-hierarchy</a></td></tr><tr><td align="center">Kitchen-Terraform Testing Resources</td><td>This repository manages a project for <a href="https://newcontext-oss.github.io/kitchen-terraform/">Kitchen-Terraform</a> to test <a href="https://www.terraform.io/">Terraform</a> child modules. It also creates any required infrastructure to run the tests. <a href="https://newcontext-oss.github.io/kitchen-terraform/">Kitchen-Terraform</a> provides a set of Test Kitchen plugins that enable the use of Test Kitchen to converge a Terraform configuration and verify the resulting infrastructure systems with InSpec controls.</td><td><a href="../../../.gitbook/assets/trace-card.png">trace-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-kitchen-terraform">https://github.com/osinfra-io/google-cloud-kitchen-terraform</a></td></tr><tr><td align="center">Networking</td><td>This repository manages network resources like VPC, subnet, DNS, and NAT that can be shared across an organization.</td><td><a href="../../../.gitbook/assets/cloud-network-card.png">cloud-network-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-networking">https://github.com/osinfra-io/google-cloud-networking</a></td></tr><tr><td align="center">Terraform Backend</td><td>This repository manages the Terraform backend for <a href="https://developer.hashicorp.com/terraform/language/state">state </a>management. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources.</td><td><a href="../../../.gitbook/assets/cloud-storage-card.png">cloud-storage-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-terraform-backend">https://github.com/osinfra-io/google-cloud-terraform-backend</a></td></tr><tr><td align="center">Workload Identity</td><td>This repository configures <a href="https://cloud.google.com/iam/docs/workload-identity-federation">workload identity federation</a>. With <a href="https://cloud.google.com/iam/docs/workload-identity-federation">workload identity federation</a>, you can use Identity and Access Management (IAM) to grant external identities IAM roles, including the ability to impersonate service accounts. This lets you access resources directly using a <a href="https://cloud.google.com/iam/docs/create-short-lived-credentials-direct">short-lived access token</a> and eliminates the maintenance and security burden associated with service account keys.</td><td><a href="../../../.gitbook/assets/workload-identity-pool-card.png">workload-identity-pool-card.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-workload-identity">https://github.com/osinfra-io/google-cloud-workload-identity</a></td></tr></tbody></table>
