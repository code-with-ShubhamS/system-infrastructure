# ⚡ Why Zero Downtime Deployment Matters

Zero downtime deployment means updating your app without interrupting user requests. At a small scale, a one or two second restart is harmless. At the scale of Google, Microsoft, Netflix, or ChatGPT, a single second of downtime can cost millions.

---

## 🌍 What Happens at Global Scale

Large platforms handle massive traffic every second. Even a single second of outage can cause serious failures.

### 🔎 Google

* Handles more than **100,000 searches per second**.
* One second of downtime means **100,000 failed searches**.
* One minute downtime means **6 million failed searches**.
* Estimated loss can reach **1 to 2 million dollars per minute**.

### 🎬 Netflix

* Accounts for around **15 percent** of global internet traffic during peak.
* Earns more than **50 million dollars per day**.
* One second of outage affects **tens of thousands of streams**.
* One minute downtime can cost **more than 200,000 dollars**.

### 🤖 ChatGPT (OpenAI)

* More than **100 million weekly users**.
* More than **2 million signups** on peak days.
* Handles **hundreds of thousands of requests per second**.
* One second downtime fails **huge number of API calls and signups**.
* Can lose **hundreds of thousands of dollars per minute**.

At this level, even one failed request can mean financial loss, support issues, churn, and trust problems.

---

## 🧪 What About Small Projects

If you are building learning projects or small apps:

* A one or two second restart is completely fine.
* Your application does not have continuous traffic.
* Users will not even notice.

**Rule:** small scale can tolerate downtime, large scale cannot.

---

## 🛠️ Strategies for Zero Downtime Deployment

There are multiple ways to achieve smooth deployments.

### 🔵🟢 Blue Green Deployment

* Two environments: **Blue** (live) and **Green** (new).
* Deploy to green, test, switch traffic.
* Users never experience downtime.
* We will learn this approach later.

### ♻️ Process Based Load Balancing

This is the method we will use.

* PM2 runs multiple processes of your app.
* Traffic is distributed automatically.
* When one process restarts, others keep running.
* Achieves **zero downtime** easily.

---

## ⭐ Summary

* Small apps can handle one or two seconds of downtime.
* At scale, even one second can cost millions.
* Google, Microsoft, Netflix, ChatGPT all rely on zero downtime.
* Blue green deployments and PM2 clusters are common solutions.
* In our course, we will achieve zero downtime using PM2.



# For Zero downtime you can use this approach 
How to run your Node.js app in PM2 cluster mode

```pm2 start app.js -i 2 --name my-app```
In this pm2 run two process and he continously switch those process when we deploy our application so in this case we didn't get a downtime but there is one problem we are going to face which is switching the process . so sometime there will be lot of chance that user can see different response because currently the process is switching.

- -i 2 → exactly 2 instances.
- Without -i, PM2 uses fork mode (1 process only).

2. What does “round-robin” mean in PM2 cluster?

## When you run in cluster mode:
You still listen on one port (e.g. 3000).
PM2 starts multiple Node processes (workers).

Incoming requests are distributed round-robin:
1st request → worker 1
2nd request → worker 2
3rd request → worker 3
… then back to worker 1, etc.
So the same user might hit different processes on different requests.