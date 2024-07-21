---
description: >-
  A Terraform module (usually the root module of a configuration) can call other
  modules to include their resources into the configuration.
---

# Child Modules

> A Terraform module (usually the root module of a configuration) can _call_ other modules to include their resources into the configuration. A module that has been called by another module is often referred to as a _child module._
>
> Child modules can be called multiple times within the same configuration, and multiple configurations can use the same child module.

{% hint style="warning" %}
_We do not recommend consuming these child modules like you might a_ [_public module_](https://registry.terraform.io/browse/modules)_. They aim to be a baseline, something you can fork, potentially maintain, and modify to fit your organization's needs. Using public modules vs. writing your own has various_ [_drivers and trade-offs_](../../architecture-decision-records/adr-0003.md) _your organization should evaluate._
{% endhint %}

## Catalog

### Google Cloud Platform

<table data-view="cards"><thead><tr><th align="center"></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td align="center">Cloud SQL</td><td><a href="https://github.com/osinfra-io/terraform-google-cloud-sql">https://github.com/osinfra-io/terraform-google-cloud-sql</a></td><td><a href="../../../.gitbook/assets/cloud-sql-card.png">cloud-sql-card.png</a></td></tr><tr><td align="center">Kubernetes Engine</td><td><a href="https://github.com/osinfra-io/terraform-google-kubernetes-engine">https://github.com/osinfra-io/terraform-google-kubernetes-engine</a></td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td align="center">Project</td><td><a href="https://github.com/osinfra-io/terraform-google-project">https://github.com/osinfra-io/terraform-google-project</a></td><td><a href="../../../.gitbook/assets/project-card.png">project-card.png</a></td></tr><tr><td align="center">Storage Bucket</td><td><a href="https://github.com/osinfra-io/terraform-google-storage-bucket">https://github.com/osinfra-io/terraform-google-storage-bucket</a></td><td><a href="../../../.gitbook/assets/cloud-storage-card (1).png">cloud-storage-card (1).png</a></td></tr><tr><td align="center">Network</td><td><a href="https://github.com/osinfra-io/terraform-google-network">https://github.com/osinfra-io/terraform-google-network</a></td><td><a href="../../../.gitbook/assets/virtual-private-cloud-card.png">virtual-private-cloud-card.png</a></td></tr><tr><td align="center">Datadog Integration</td><td><a href="https://github.com/osinfra-io/terraform-datadog-google-integration">https://github.com/osinfra-io/terraform-datadog-google-integration</a></td><td><a href="../../../.gitbook/assets/datadog-card.png">datadog-card.png</a></td></tr></tbody></table>

### Kubernetes

<table data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden></th></tr></thead><tbody><tr><td align="center">Istio</td><td><a href="../../../.gitbook/assets/istio-card.png">istio-card.png</a></td><td></td><td></td><td><a href="https://github.com/osinfra-io/terraform-kubernetes-istio">https://github.com/osinfra-io/terraform-kubernetes-istio</a></td><td></td></tr><tr><td align="center">Datadog Operator</td><td><a href="../../../.gitbook/assets/datadog-card.png">datadog-card.png</a></td><td></td><td></td><td><a href="https://github.com/osinfra-io/terraform-kubernetes-datadog-operator">https://github.com/osinfra-io/terraform-kubernetes-datadog-operator</a></td><td></td></tr><tr><td align="center"></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>

