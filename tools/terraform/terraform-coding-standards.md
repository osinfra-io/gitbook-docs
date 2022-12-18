---
description: >-
  A set of rules, techniques, and best practices for creating a cleaner, more
  readable, and more efficient code base with minimal errors. It helps future
  authors, as well as code reviewers, align.
---

# Terraform Coding Standards

<figure><img src="../../.gitbook/assets/terraform-logo.png" alt=""><figcaption></figcaption></figure>

## Style Conventions

> The Terraform parser allows flexibility in laying out the elements in your configuration files. Still, the Terraform language also has some idiomatic style conventions, which we recommend users always follow for consistency between files and modules written by different teams.

{% hint style="info" %}
You can enforce these conventions automatically by running `terraform fmt`
{% endhint %}

* Understand the official [Terraform configuration syntax](https://www.terraform.io/language/syntax/configuration).
* Align with the official [Terraform style conventions](https://www.terraform.io/language/syntax/style).

### Blocks

A block is a container for other content. Block types should be in the following order and grouped with like types.

* [Providers](https://www.terraform.io/language/providers): Terraform relies on " providers " plugins to interact with cloud providers, SaaS providers, and other APIs.
* [Data Sources](https://www.terraform.io/language/data-sources): _Data sources_ allow Terraform to use the information defined outside of Terraform, defined by another separate Terraform configuration, or modified by functions.
* [Modules](https://www.terraform.io/language/modules): _Modules_ are containers for multiple resources that are used together. A module consists of a collection of `.tf` files in a directory.
* [Resources](https://www.terraform.io/language/resources): _Resources_ are the most crucial element in the Terraform language. Each resource block describes one or more infrastructure objects, such as virtual networks, compute instances, or higher-level components, such as DNS records.

