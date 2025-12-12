#### Sharding is MongoDB's method for horizontal scaling. It works by distributing large datasets across multiple independent servers, or groups of servers, called shards . Instead of storing all your data on a single massive server, sharding breaks up the data and stores subsets of it on smaller, individual clusters

## When Do You Use Sharding?
You implement sharding when a single ```replica set``` can no longer handle the demands of your application. This usually happens in one of two scenarios:

1. High-Volume Write Traffic
When your application generates an overwhelming number of write operations (e.g., millions of writes per second), a single server (even the primary in a replica set) can become a bottleneck. Sharding distributes these writes across multiple primaries, dramatically increasing the cluster's write throughput.

2. Massive Data Size
When your dataset grows so large that it either:

Exceeds the storage capacity of a single server's disk.

Takes too long to manage or back up.

Sharding lets you logically combine the storage capacity of many servers, allowing your dataset to grow virtually infinitely. This is often described as scaling out instead of scaling up.

In summary, sharding is generally reserved for applications with truly massive data requirements (hundreds of gigabytes to terabytes) or extremely high throughput needs.