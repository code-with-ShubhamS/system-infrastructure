import { spawn } from "child_process";

export async function runScript(scriptPath, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(scriptPath, [], {
      env: { ...process.env, ...env },
      stdio: ["ignore", "pipe", "pipe"], // 👈 IMPORTANT
      shell: true,
    });

    let output = "";
    let errorOutput = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject({
          code,
          error: errorOutput || output,
        });
      }
    });

    child.on("error", reject);
  });
}
