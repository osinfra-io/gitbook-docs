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
_We do not recommend consuming this module like you might a_ [_public module_](https://registry.terraform.io/browse/modules)_. Its purpose is to be a baseline, something you can fork and potentially maintain on your own and modify to fit your organization's needs. Using public modules vs. writing your own have various_ [_drivers and trade-offs_](https://github.com/orgs/osinfra-io/discussions/3) _that your organization should evaluate._
{% endhint %}

* [terraform-google-cloud-dns](https://github.com/osinfra-io/terraform-google-cloud-dns)
* [terraform-google-cloud-nat](https://github.com/osinfra-io/terraform-google-cloud-nat)
* [terraform-google-project](https://github.com/osinfra-io/terraform-google-project)
* [terraform-google-storage-bucket](https://github.com/osinfra-io/terraform-google-storage-bucket)
* [terraform-google-subnet](https://github.com/osinfra-io/terraform-google-subnet)
* [terraform-google-vpc](https://github.com/osinfra-io/terraform-google-vpc)

