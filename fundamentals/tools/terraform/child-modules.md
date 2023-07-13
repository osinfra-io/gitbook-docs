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
_We do not recommend consuming these child modules like you might a_ [_public module_](https://registry.terraform.io/browse/modules)_. Their purpose is to be a baseline, something you can fork, potentially maintain, and modify to fit your organization's needs. Using public modules vs. writing your own has various_ [_drivers and trade-offs_](../../architecture-decision-records/adr-0002.md) _your organization should evaluate._
{% endhint %}

## Catalog

<table data-view="cards"><thead><tr><th align="center"></th><th data-type="rating" data-max="5"></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td align="center">Google Cloud DNS</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-cloud-dns">https://github.com/osinfra-io/terraform-google-cloud-dns</a></td><td><a href="../../../.gitbook/assets/cloud-dns-card.png">cloud-dns-card.png</a></td></tr><tr><td align="center">Google Cloud NAT</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-cloud-nat">https://github.com/osinfra-io/terraform-google-cloud-nat</a></td><td><a href="../../../.gitbook/assets/cloud-nat-card.png">cloud-nat-card.png</a></td></tr><tr><td align="center">Google Project</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-project">https://github.com/osinfra-io/terraform-google-project</a></td><td><a href="../../../.gitbook/assets/project-card.png">project-card.png</a></td></tr><tr><td align="center">Google Storage Bucket</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-storage-bucket">https://github.com/osinfra-io/terraform-google-storage-bucket</a></td><td><a href="../../../.gitbook/assets/cloud-storage-card (1).png">cloud-storage-card (1).png</a></td></tr><tr><td align="center">Google Subnet</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-subnet">https://github.com/osinfra-io/terraform-google-subnet</a></td><td><a href="../../../.gitbook/assets/subnet-card.png">subnet-card.png</a></td></tr><tr><td align="center">Google VPC</td><td>null</td><td><a href="https://github.com/osinfra-io/terraform-google-vpc">https://github.com/osinfra-io/terraform-google-vpc</a></td><td><a href="../../../.gitbook/assets/virtual-private-cloud-card.png">virtual-private-cloud-card.png</a></td></tr></tbody></table>

