# CI / CD Notes (Why we use these)

## 1. export VARIABLE
We export variables so they are available to child processes.
Node.js tests and apps read them using `process.env`.

Example:
export APP_DIR=/path/to/app
→ Accessible inside Node as process.env.APP_DIR

Used for:
- Passing paths
- Passing ports
- Passing environment config


## 2. execSync
Used for short, blocking commands that MUST finish before next step.

Examples:
- git clone
- npm ci
- npm test
- npm run build

Why:
- Simple
- Sequential
- CI should stop immediately if these fail


## 3. spawn
Used for long-running processes like servers.

Examples:
- node server.js
- npm start

Why:
- Non-blocking
- Allows reading logs
- Allows health checks
- Allows killing process after test


## 4. Why not threads?
CI needs isolation and safety.
Processes give:
- Separate memory
- Easy kill
- Crash isolation

Threads do not.


## 5. CI Rule
execSync → "run and wait"
spawn    → "start and control"

That’s it.

Node.js CI Script (Process)
   ├── execSync → child process (wait)
   ├── spawn → child process (parallel)
   └── worker_threads → threads (same process)
