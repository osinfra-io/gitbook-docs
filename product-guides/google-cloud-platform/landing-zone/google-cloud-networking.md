---
description: >-
  A standard network resource layer that aligns with our Google Cloud landing
  zone platform design. A landing zone should be a prerequisite to deploying
  enterprise workloads in a cloud environment.
---

# Networking

This layer provides platform teams with common networking resources like VPCs, VPNs, DNS, and NATs. It's a lower-level layer and, in most cases, isn't geared toward stream-aligned teams. Terraform manages it and provides a consistent experience for developers to consume common resources.

Providing several standard services across an organization is critical to enabling fast flow and eliminating low-level tasks for teams.&#x20;

## CIDR Blocks

The following CIDR blocks are available:

| Subnet address |       VPC       |
| :------------: | :-------------: |
|   10.0.0.0/10  | standard-shared |
|  10.64.0.0/10  |       free      |
|  10.128.0.0/10 |       free      |
|  10.192.0.0/10 |       free      |

### VPC Name: `standard-shared`

This VPC uses the same sandbox, non-production, and production ranges. Each environment has a project and operates independently from each other. It uses the default size for the subnet's primary IP range, the subnet's secondary IP range for Pods, and the subnet's secondary IP range for Services.

[GKE IPAM calculator](https://googlecloudplatform.github.io/gke-ip-address-management)

We break up the `10.0.0.0/10` CIDR block with the above calculator using the following inputs:

<pre class="language-json"><code class="lang-json">{
<strong> "network": "10.0.0.0",
</strong> "netmask": 10,
 "nodeNetmask": 21,
 "clusterNetmask": 15,
 "serviceNetmask": 21,
 "nodePodNetmask": "24",
 "masterNetwork": "UNIQUE",
 "locationType": "REGIONAL",
 "extraZones": 1
}
</code></pre>

A Kubernetes [VPC-native cluster\_](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips) uses [secondary ranges](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips#cluster\_sizing\_secondary\_range\_pods) for Pods & Services.

{% hint style="info" %}
The size of the cluster's secondary ranges determines the maximum number of Pods and Services for a given GKE cluster. The maximum number of nodes in the cluster is limited by the size of the cluster's subnet's primary IP address range and the cluster's Pod address range.
{% endhint %}

This will give us up to 31 clusters, and each cluster will support the following:

* Up to 510 nodes per cluster
* Up to 2048 services per cluster
* Up to 110 pods per node

<table data-card-size="large" data-view="cards"><thead><tr><th>Cluster</th><th>Primary CIDR</th><th>Secondary PODs CIDR</th><th>Secondary Services CIDR</th><th>Master CIDR</th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td>services-us-east1-b</td><td>10.62.0.0/21</td><td>10.0.0.0/15</td><td>10.62.248.0/21</td><td>10.63.240.0/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td>services-us-east1-c</td><td>10.62.8.0/21</td><td>10.2.0.0/15</td><td>10.63.0.0/21</td><td>10.63.240.16/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td>services-us-east1-d</td><td>10.62.16.0/21</td><td>10.4.0.0/15</td><td>10.63.8.0/21</td><td>10.63.240.32/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td>services-us-east4-a</td><td>10.62.24.0/21</td><td>10.6.0.0/15</td><td>10.63.16.0/21</td><td>10.63.240.48/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td>services-us-east4-b</td><td>10.62.32.0/21</td><td>10.8.0.0/15</td><td>10.63.24.0/21</td><td>10.63.240.64/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr><tr><td>services-us-east4-c</td><td>10.62.40.0/21</td><td>10.10.0.0/15</td><td>10.63.32.0/21</td><td>10.63.240.80/28</td><td><a href="../../../.gitbook/assets/kubernetes-engine-card.png">kubernetes-engine-card.png</a></td></tr></tbody></table>
