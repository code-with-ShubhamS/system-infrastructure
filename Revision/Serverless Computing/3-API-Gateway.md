# 🚪 What is an API Gateway?

An **API Gateway** is a **single entry point** for client requests that routes those requests to different backend services.  
It is **most commonly used in microservices architecture**, where an application is split into multiple independent services. Instead of clients talking to many services directly, they talk to **one gateway**.

---
```
API gateway is a entry point where the req will come and than it decide which services or server he need to call /products , /carts , /users etc.

We can use it in front of our lambda function.
It work same as ngnix because ngnix do the same thing. 
```

## 🔀 What the API Gateway does behind the scenes

### 🧭 Smart routing

* `/users/*` → User Service
* `/products/*` → Product Service
* `/orders/*` → Order Service
* `/payments/*` → Payment Service

### 🔐 Authentication

* Validate token once
* Forward user identity to services

### 🚦 Rate limiting

* Prevent abuse
* Protect expensive endpoints like payments

### 📊 Observability

* Central logging
* Unified metrics
* Easier debugging

### 🛡️ Security

* Hide internal services
* Block bad traffic early

---


## 🤔 Is API Gateway only for microservices?

No 🚫, but:

* Microservices is where its value is **most obvious**
* It can also be used with:

  * Serverless backends
  * Public APIs
  * Backend-for-Frontend patterns

---

## ✅ What is a Default Route?

In HTTP API, the default route is called:

```$default```


It acts as a catch-all route.

```
👉 If no other route matches, the request goes to $default.
Client → /any/path/here
        ↓
No route matched
        ↓
$default route
        ↓
Backend receives /any/path/here
```

## ✨ Final takeaway
> An API Gateway simplifies how clients talk to complex backend systems, and it is **most commonly used in microservices architectures** to provide one clean, secure, and scalable API surface 🚀

## Adding custom domain to API - Gateway(ACM). 

## Connect API Gateway to the Lambda function
As we know that when we deploy our large backend than we need to create different lambda function for diff controller. So here we use the API gateway which can receive the request and acording to the path run the lambda function. 