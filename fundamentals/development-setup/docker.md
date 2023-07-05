---
description: >-
  Use a pre-built Docker image for your Infrastructure as Code (IaC) sandbox
  development environment.
---

# Docker

<figure><img src="../../.gitbook/assets/docker-card.png" alt="" width="563"><figcaption></figcaption></figure>

## Images

Images for Ubuntu and Gentoo are available. Choose the image you are most familiar with.

{% tabs %}
{% tab title="Ubuntu" %}
Pull the following image from the GitHub container registry.

```bash
docker pull ghcr.io/osinfra-io/ubuntu:latest
```

Run the image in interactive mode.

```bash
docker run -it ghcr.io/osinfra-io/ubuntu:latest
```
{% endtab %}

{% tab title="Gentoo" %}
Pull the following image from the GitHub container registry.

```bash
docker pull ghcr.io/osinfra-io/gentoo:latest
```

Run the image in interactive mode.

```bash
docker run -it ghcr.io/osinfra-io/gentoo:latest
```
{% endtab %}
{% endtabs %}

## Visual Studio Code

Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for Visual Studio Code. The extension lets you use a [Docker container](https://docker.com/) as a full-featured development environment.

In Visual Studio Code, you can click the open a remote window icon ![](../../.gitbook/assets/vs-code-open-remote-window-icon.png) and select attach to running container.

<figure><img src="../../.gitbook/assets/vscode-attach-to-running-container.png" alt=""><figcaption></figcaption></figure>

Next, select the running container from the previous step.

<figure><img src="../../.gitbook/assets/vscode-choose-container.png" alt=""><figcaption></figcaption></figure>
