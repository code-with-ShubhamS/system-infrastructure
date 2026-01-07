# 🚀 AWS Lambda + API Gateway (Node.js + Express)

## STEP 1: Local Configuration for AWS Lambda (Node.js)

### 1. Install Required Packages

```bash
npm install express serverless-http
```

**serverless-http**  
Converts Express → AWS Lambda handler

---

### 2. Project Folder Structure (IMPORTANT)

```txt
project-root/
 ├── app.js          # Express app only
 ├── handler.js      # Lambda entry file
 ├── package.json
 ├── node_modules/
```

---

### 3. app.js (Export Express App Only)

```js
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "App ready for Lambda 🚀" });
});

export default app;
```

---

### 4. handler.js (Lambda Entry Point)
```js
import serverless from "serverless-http";
import app from "./app.js";
import { connectDb } from "./db.js";

// Memoize the connection to reuse it across Lambda warm-starts
let cachedDb = null;

export const handler = async (event, context) => {
  // 1. Handle Database Connection
  if (!cachedDb) {
    cachedDb = await connectDb();
  }

  // 2. Wrap the Express app
  const serverlessHandler = serverless(app);
  return await serverlessHandler(event, context);
};
```

---

## STEP 2: Create Default Lambda Function

- Name: my-api-lambda
- Runtime: Node.js 18.x
- Permissions: Default

```js
export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
```

---

## STEP 3: Create HTTP API Gateway

- Open API Gateway
- Click Create API
- Choose API Type (HTTP API)

Configure stages

- deveopmenmt
- production

  1️⃣ Create $deault route for HTTP API && {proxy+} route for REST API
  2️⃣ Select you default route
  3️⃣ Set Integration → Lambda
  4️⃣ Choose your Lambda function
  5️⃣ Save

```
WAY 2: Add Trigger from Lambda (Also Possible)
But we dont use it because it is not recommandend in this case.
```

Now check that api gateway is conected to my handler if yes than move to next step.
---

## STEP 4: Deploy

1. Zip project including node_modules
2. Upload to Lambda
3. Change handler name to `handler.handler`
4. Set environment variables. Add your DB_URI, API_KEY, etc.

---

## Step 5: Custom Domain (Optional)
Once the API Gateway URL works:

- In API Gateway, go to Custom domain names.
- Create a domain (e.g., api.example.com).
- Select an ACM Certificate.
- API Mappings: Map your domain to your API and the specific stage (e.g., production).
- Update your Route 53 settings to point the CNAME to the API Gateway domain name.

✅ Your API is ready
