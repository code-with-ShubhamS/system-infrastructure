import express from "express";
import crypto from "crypto";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config({});
const app = express();
const PORT = 3000; // webhook port on Server A
const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

app.use(express.json({ type: "*/*" })); // GitHub sends application/json

// Verify GitHub signature
function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", GITHUB_SECRET);
  const body = JSON.stringify(req.body);
  const digest = "sha256=" + hmac.update(body).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

app.get("/", (req, res) => {
  return res.send("Hii there");
});

app.post("/deploy-webhook", (req, res) => {
  const eventType = req.headers["x-github-event"];

  // Optionally verify signature
  // if (!verifySignature(req)) {
  //   console.log("[WEBHOOK] Invalid signature");
  //   return res.status(401).send("Invalid signature");
  // }
  res.status(200).json({ message: "got the request" });
  exec("bash ./deploy-backend.sh", (error, stdout, stderr) => {
    if (error) {
      console.error("[DEPLOY] Error:", error);
      console.error(stderr);
      return;
    }
    console.log("[DEPLOY] Output:\n", stdout);
  });

  // res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
