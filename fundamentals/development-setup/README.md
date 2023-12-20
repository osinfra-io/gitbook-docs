---
description: >-
  Local development is critical for safe and fast failure; when dealing with
  cloud providers, we can call this sandboxed Infrastructure as Code
  development.
---

# 🔩 Development Setup

Sandboxed Infrastructure as Code development allows you to use your computer and new cloud resources to run and test infrastructure instead of using your applications' existing infrastructure. You can customize the resources without worrying that it'll affect your existing infrastructure. It's a safe place to learn and a fast place to fail.

## Goals

When you invest in Infrastructure as Code (IaC), you will find that onboarding developers takes time and can be confusing for people new to development practices, limiting contributions.

* Standardized IaC developer environments
* Simplify onboarding to increase IaC developer contributions
* Create a safe place for IaC developers to learn and fail

## Development Environments

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th></th><th data-hidden></th><th data-hidden></th><th data-hidden></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-type="select"></th></tr></thead><tbody><tr><td align="center">Docker</td><td>Use a pre-built Docker image for your Infrastructure as Code (IaC) sandbox development environment.</td><td></td><td></td><td></td><td><a href="docker.md">docker.md</a></td><td><a href="../../.gitbook/assets/docker-card.png">docker-card.png</a></td><td></td></tr><tr><td align="center">GitHub Codespaces</td><td>An Infrastructure as Code (IaC) sandbox development environment. that's hosted in the cloud.</td><td></td><td></td><td></td><td><a href="github-codespaces.md">github-codespaces.md</a></td><td><a href="../../.gitbook/assets/github-codespaces-card.png">github-codespaces-card.png</a></td><td></td></tr><tr><td align="center">Ubuntu</td><td>Use the Ubuntu distribution as an Infrastructure as Code (IaC) sandbox development environment.</td><td></td><td></td><td></td><td><a href="ubuntu.md">ubuntu.md</a></td><td><a href="../../.gitbook/assets/ubuntu-card.png">ubuntu-card.png</a></td><td></td></tr><tr><td align="center">Windows (WSL)</td><td>Windows with Windows Subsystem for Linux as your Infrastructure as Code (IaC) sandbox development environment.</td><td></td><td></td><td></td><td><a href="windows-wsl.md">windows-wsl.md</a></td><td><a href="../../.gitbook/assets/windows-11-card.png">windows-11-card.png</a></td><td></td></tr></tbody></table>
