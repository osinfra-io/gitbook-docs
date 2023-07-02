---
description: >-
  Examples for setting up a Google Cloud landing zone platform to run scalable,
  production-ready enterprise workloads.
---

# 🛬 Landing Zone

## Service Interfaces 🔩

* [Add or update Terraform backend](https://github.com/osinfra-io/google-cloud-terraform-backend/issues/new?assignees=\&labels=enhancement%2Cgood+first+issue\&template=add-update-backend.yml\&title=Add+or+update+Terraform+backend)
* [Add or update Kubernetes networking resources](https://github.com/osinfra-io/google-cloud-services/issues/new?assignees=\&labels=enhancement%2Cgood+first+issue\&projects=\&template=add-update-k8s-networking-resources.yml\&title=%F0%9F%94%A9+Add+or+update+Kubernetes+networking+resources)
* [Add or update identity group](https://github.com/osinfra-io/google-cloud-hierarchy/issues/new?assignees=\&labels=enhancement\&template=add-update-identity-group.yml\&title=Add+or+update+identity+group)
* [Add or update folder](https://github.com/osinfra-io/google-cloud-hierarchy/issues/new?assignees=\&labels=enhancement\&template=add-update-folder.yml\&title=Add+or+update+folder)

## Response Times 🕙

* Responsible team: [Platform - Google Cloud Landing Zone](https://github.com/orgs/osinfra-io/teams/google-cloud-platform-team)
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

* Discord: [Platform - Google Cloud Landing Zone](https://discord.gg/YPg4AmMDvF)
* Phone number:
{% endtab %}

{% tab title="Support or provide feedback" %}
Contact via any of these:

* Discord: [Platform - Google Cloud Landing Zone](https://discord.gg/YPg4AmMDvF)
* Email address: [platform-google-cloud-landing-zone@osinfra.io](mailto:platform-google-cloud-landing-zone@osinfra.io)
* Phone number:
* Office hours (EST): `Weekdays 5:00PM - 10:00PM` `Weekends 8:00AM - 5:00PM`
{% endtab %}
{% endtabs %}

## Platform Dependencies 🏗️

<table data-view="cards" data-full-width="false"><thead><tr><th></th><th></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Audit Logging:</td><td>This repository manages centralized audit logging resources. Google Cloud services write audit logs that record administrative activities and access within your Google Cloud resources. <a href="https://cloud.google.com/logging/docs/audit">Audit logs</a> help you answer "who did what, where, and when?" within your Google Cloud organization.</td><td><a href="../../../.gitbook/assets/audit-logging.png">audit-logging.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-audit-logging">https://github.com/osinfra-io/google-cloud-audit-logging</a></td></tr><tr><td>Resource Hierarchy and IAM:</td><td>This repository manages a resource hierarchy and IAM. Metaphorically speaking, the <a href="https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy">Google Cloud resource hierarchy</a> resembles the file system found in traditional operating systems to organize and manage entities hierarchically. <a href="https://cloud.google.com/iam">Identity and Access Management (IAM)</a> lets administrators authorize who can take action on specific resources, giving you complete control and visibility to manage Google Cloud resources centrally.</td><td><a href="../../../.gitbook/assets/administration.png">administration.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-hierarchy">https://github.com/osinfra-io/google-cloud-hierarchy</a></td></tr><tr><td>Kitchen-Terraform Testing Resources:</td><td>This repository manages a project for <a href="https://newcontext-oss.github.io/kitchen-terraform/">Kitchen-Terraform</a> to test <a href="https://www.terraform.io/">Terraform</a> child modules. It also creates any required infrastructure to run the tests. <a href="https://newcontext-oss.github.io/kitchen-terraform/">Kitchen-Terraform</a> provides a set of Test Kitchen plugins that enable the use of Test Kitchen to converge a Terraform configuration and verify the resulting infrastructure systems with InSpec controls.</td><td><a href="../../../.gitbook/assets/trace.png">trace.png</a></td><td><a href="https://github.com/osinfra-io/google-cloud-kitchen-terraform">https://github.com/osinfra-io/google-cloud-kitchen-terraform</a></td></tr></tbody></table>

### Shared Resources

#### Repository: [google-cloud-shared-resources](https://github.com/osinfra-io/google-cloud-shared-resources)

{% hint style="info" %}
This repository manages resources like VPC, subnet, DNS, NAT, and other common resources that can be shared across an organization.
{% endhint %}

### Terraform Backend

#### Repository: [google-cloud-terraform-backend](https://github.com/osinfra-io/google-cloud-terraform-backend)

{% hint style="info" %}
This repository manages the Terraform backend for [state ](https://developer.hashicorp.com/terraform/language/state)management. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources.
{% endhint %}

### Workload Identity

#### Repository: [google-cloud-workload-identity](https://github.com/osinfra-io/google-cloud-workload-identity)

{% hint style="info" %}
This repository configures [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation). With [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation), you can use Identity and Access Management (IAM) to grant external identities IAM roles, including the ability to impersonate service accounts. This lets you access resources directly using a [short-lived access token](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct) and eliminates the maintenance and security burden associated with service account keys.
{% endhint %}
