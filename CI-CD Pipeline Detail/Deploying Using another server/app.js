import express from "express";
import crypto from "crypto";
import { exec } from "child_process";
import dotenv from "dotenv";
import { runScript } from "./scripts/runScripts.js";
import { sendMail } from "./scripts/mailer.js";

dotenv.config({});
const app = express();
const PORT = 3000;

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature || !signature.startsWith("sha256=")) {
    console.log("Not verified");
    return false;
  }

  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    throw new Error("GitHub secret not configured");
  }

  const hmac = crypto
    .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET)
    .update(req.rawBody);

  const digest = Buffer.from("sha256=" + hmac.digest("hex"), "utf8");

  const sigBuffer = Buffer.from(signature, "utf8");

  // Prevent timingSafeEqual crash
  if (digest.length !== sigBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(digest, sigBuffer);
}

app.get("/", (req, res) => {
  return res.send("Hii there");
});

app.post("/deploy-webhook", async (req, res) => {
  const eventType = req.headers["x-github-event"];

  // if (eventType !== "push" || !verifySignature(req)) {
  //   console.log("[WEBHOOK] Invalid signature or event");
  //   return res.status(401).send("Invalid signature or event");
  // }

  res.status(200).json({ message: "got the request" });
  try {
    console.log("🧪 Running tests...");
    const testResult = await runScript("bash ./test-backend.sh");

    console.log("🚀 Tests passed. Deploying...");
    const deployResult = await runScript("bash ./deploy-backend.sh");

    console.log("✅ Deployment successful");

    // 3️⃣ Success mail
    await sendMail(
      "✅ CI Success: Tests & Deployment Passed",
      `✔ Tests: PASSED ✔ Deployment: PASSED
        Test Logs:
        ${testResult.output}
        Deploy Logs:
        ${deployResult.output}`
    );
  } catch (err) {
    console.error("❌ Pipeline failed:", err.message);

    // ❌ Failure mail (context-aware)
    await sendMail(
      `❌ CI Failed at ${err.name}`,
      `
❌ Step Failed: ${err.name}
Exit Code: ${err.code}

Error Logs:
${err.error}
`
    );

    console.error(`❌ ${err.name} failed`);
    process.exit(1);
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
