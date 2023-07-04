---
description: >-
  A common network resource layer that aligns with our Google Cloud landing zone
  platform design. A landing zone should be a prerequisite to deploying
  enterprise workloads in a cloud environment.
---

# Networking

This layer provides common networking resources like VPCs, VPNs, DNS, NATs, and more to platform teams.  It's a lower-level layer and, in most cases, isn't geared toward stream-aligned teams. Terraform manages it and provides a consistent experience for developers to consume common resources.

Providing several common services across an organization is key to enabling fast flow and removing low-level tasks for teams. Things like VPCs, VPNs, DNS, and NATs can take up a lot of development time when the cloud resources they want to use require them.

## CIDR Blocks

The following CIDR blocks are available:

| Subnet address |       VPC       |
| :------------: | :-------------: |
|   10.0.0.0/10  | standard-shared |
|  10.64.0.0/10  |       free      |
|  10.128.0.0/10 |       free      |
|  10.192.0.0/10 |       free      |

### VPC Name: `standard-shared`

> NOTE: This VPC uses the same ranges for sandbox, pre-production and production. It uses the default size for the subnet's primary IP range, the subnet's secondary IP range for Pods and the subnet's secondary IP range for Services.

[GKE IPAM calculator](https://googlecloudplatform.github.io/gke-ip-address-management)

We are breaking up the `10.0.0.0/10` CIDR block with the above calculator using the following inputs:

```json
{
 "network": "10.0.0.0",
 "netmask": 10,
 "nodeNetmask": 20,
 "clusterNetmask": 14,
 "serviceNetmask": 20,
 "nodePodNetmask": 24,
 "masterNetwork": "UNIQUE",
 "locationType": "REGIONAL",
 "extraZones": 1
}
```

#### Kubernetes Info

_NOTES: A Kubernetes_ [_VPC-native cluster_](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips) _uses_ [_secondary ranges_](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips#cluster\_sizing\_secondary\_range\_pods) _for Pods & Services._

**The size of the cluster's secondary ranges determines the maximum number of Pods and Services for a given GKE cluster. The maximum number of nodes in the cluster is limited by the size of the cluster's subnet's primary IP address range and the cluster's Pod address range.**

This will give us 15 clusters, and each cluster will support the following:

* Up to 1023 node(s) per cluster.
* Up to 4096 service(s) per cluster.
* Up to 110 pods per node.

**Master CIDR Block:**

|  Subnet Address |      Cluster      |
| :-------------: | :---------------: |
|  10.61.224.0/28 | services-us-east1 |
| 10.61.224.16/28 | services-us-east4 |
| 10.61.224.32/28 |                   |
| 10.61.224.48/28 |                   |

**Primary Ranges:**

| Subnet Address | Nodes |          Name         |
| :------------: | :---: | :-------------------: |
|  10.60.0.0/20  |  4092 | services-k8s-us-east1 |
|  10.60.16.0/20 |  4092 | services-k8s-us-east4 |
|  10.60.32.0/20 |  4092 |                       |
|  10.60.48.0/20 |  4092 |                       |

**Secondary Pod Ranges:**

| Subnet Address |  Pods  |            Name            |      Cluster      |
| :------------: | :----: | :------------------------: | :---------------: |
|   10.0.0.0/14  | 112640 | services-k8s-pods-us-east1 | services-us-east1 |
|   10.4.0.0/14  | 112640 | services-k8s-pods-us-east4 | services-us-east4 |
|   10.8.0.0/14  | 112640 |                            |                   |
|  10.12.0.0/14  | 112640 |                            |                   |

**Secondary Service Ranges:**

| Subnet Address | Services |              Name              |      Cluster      |
| :------------: | :------: | :----------------------------: | :---------------: |
| 10.60.240.0/20 |   4096   | services-k8s-services-us-east1 | services-us-east1 |
|  10.61.0.0/20  |   4096   | services-k8s-services-us-east4 | services-us-east4 |
|  10.61.16.0/20 |   4096   |                                |                   |
|  10.61.32.0/20 |   4096   |                                |                   |
