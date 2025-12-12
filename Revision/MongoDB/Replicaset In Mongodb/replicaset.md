# MongoDB Replica Set in Production

Main point ya ha ki ham replicaset ka use issiliya karta ha ki multiple mongodb server(not databases) ko run kar saka aur usko connect kar saka mera backend sa .so agar mera primary server  down ho gaya to mera pass baki ka server ha jisma sa ek server primary ban jaega. 
But remeber agar kissi na primary node sa data ko drop kar diya to vo sab ma reflect hoga so ya koi data backup ki technique nahi ha . Ya sirf issiliya use ha mainly ki agar mera server galti sa baand ho jai to ma alag server pa chala jau . 


 If you want to use MongoDB's startTransaction() feature for changes affecting multiple documents in your backend, you absolutely need to configure your MongoDB deployment as a replica set.

 
### Remember only in primart we can perform operation like CRUD in seconday node we can only read data from their .
## Key Points

- **Multiple Servers:**  
  In production, a replica set consists of **multiple MongoDB servers** (Primary + Secondaries) running on different machines or platforms.

- **High Availability:**  
  If the **Primary server crashes**, one of the Secondaries is automatically elected as the new Primary, keeping the database online without downtime.

- **Data Redundancy:**  
  All write operations on the Primary are **replicated to Secondaries**, ensuring multiple nodes have the same data.

- **Read Scalability:**  
  Applications can read from Secondary nodes to **distribute read load** and reduce pressure on the Primary.

- **Not a Backup:**  
  Replica sets **do not replace backups**.  
  - Accidental deletes or bad writes are replicated across all nodes.  
  - Backups or delayed secondaries are required for data recovery.

- **Single Machine Limitation:**  
  Running multiple replica set nodes on a **single computer** is **not efficient**.  
  - If the computer goes down, all nodes go down together.  
  - The benefits of High Availability and failover are lost.  

---

## Setting Up a Replica Set in Production

1. **Start MongoDB on multiple servers** with the same replica set name:
   ```bash
   mongod --replSet rs0 --dbpath /data/db --port 27017

2. Initialize the replica set on the first server (Primary):

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1.example.com:27017" },
    { _id: 1, host: "mongo2.example.com:27017" },
    { _id: 2, host: "mongo3.example.com:27017" }
  ]
})

3. Connect your application using the replica set URI:

mongodb://mongo1.example.com:27017,mongo2.example.com:27017,mongo3.example.com:27017/mydb