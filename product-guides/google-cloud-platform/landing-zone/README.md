---
description: >-
  This guide helps set up a Google Cloud landing zone in order to run scalable,
  production-ready enterprise workloads.
---

# Landing Zone

## 🏗️ Platform Dependencies

### Audit Logging

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-audit-logging](https://github.com/osinfra-io/google-cloud-audit-logging)

{% hint style="info" %}
This repository manages centralized audit logging resources. Google Cloud services write audit logs that record administrative activities and access within your Google Cloud resources. [Audit logs](https://cloud.google.com/logging/docs/audit) help you answer "who did what, where, and when?" within your Google Cloud organization.
{% endhint %}

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-hierarchy](https://github.com/osinfra-io/google-cloud-hierarchy)

{% hint style="info" %}
This repository manages a resource hierarchy and IAM. Metaphorically speaking, the [Google Cloud resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) resembles the file system found in traditional operating systems to organize and manage entities hierarchically. [Identity and Access Management (IAM)](https://cloud.google.com/iam) lets administrators authorize who can take action on specific resources, giving you complete control and visibility to manage Google Cloud resources centrally.
{% endhint %}

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-kitchen-terraform](https://github.com/osinfra-io/google-cloud-kitchen-terraform)

{% hint style="info" %}
This repository manages a project for [Kitchen-Terraform](https://newcontext-oss.github.io/kitchen-terraform/) to test [Terraform](https://www.terraform.io/) child modules. It also creates any required infrastructure to run the tests. [Kitchen-Terraform](https://newcontext-oss.github.io/kitchen-terraform/) provides a set of Test Kitchen plugins that enable the use of Test Kitchen to converge a Terraform configuration and verify the resulting infrastructure systems with InSpec controls.
{% endhint %}

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-shared-resources](https://github.com/osinfra-io/google-cloud-shared-resources)

{% hint style="info" %}
This repository manages resources like VPC, subnet, DNS, Kubernetes, and other common resources that can be shared across an organization.
{% endhint %}

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-terraform-backend](https://github.com/osinfra-io/google-cloud-terraform-backend)

{% hint style="info" %}
This repository manages the Terraform backend for [state ](https://developer.hashicorp.com/terraform/language/state)management. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources. Terraform uses persisted state data to keep track of the resources it manages. Most non-trivial Terraform configurations use a backend to store state remotely. This lets multiple people access the state data and work together on that collection of infrastructure resources.
{% endhint %}

<img src="../../../.gitbook/assets/github-white-transparent.png" alt="" data-size="line"> [google-cloud-workload-identity](https://github.com/osinfra-io/google-cloud-workload-identity)

{% hint style="info" %}
This repository configures [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation). With [workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation), you can use Identity and Access Management (IAM) to grant external identities IAM roles, including the ability to impersonate service accounts. This lets you access resources directly using a [short-lived access token](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct) and eliminates the maintenance and security burden associated with service account keys.
{% endhint %}
