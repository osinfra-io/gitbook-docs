---
description: >-
  Learning from the practices of software development, we must develop
  "locally." When dealing with cloud providers, we can call this sandboxed
  development.
---

# Setup

Sandboxed development allows you to use your computer and new cloud resources to run and test infrastructure instead of using your applications' existing infrastructure. You can customize the resources without worrying that it'll affect your existing infrastructure. It's a safe place to learn and the fastest place to fail.

{% hint style="info" %}
Tools like [LocalStack](https://github.com/localstack/localstack) for Amazon Web Services are available; however, resource coverage is usually far behind, and local simulation of services limits test confidence. As well, many large organizations have a multi-cloud approach.
{% endhint %}

The preference for sandboxed development reduces the complexity of local setup in favor of automation around onboarding developers in the cloud.
