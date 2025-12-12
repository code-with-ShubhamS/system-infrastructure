import express, { json } from "express";
import courses from "./courses.json" with { type: "json" };
import orders from "./orders.json" with { type: "json" };
import cors from "cors";
import Stripe from 'stripe';
import crypto from "crypto"
import fs from "fs";
import path from "path";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
     credentials: true,   
  })
); 

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    console.log("skiping express.json()")
    next(); // skip express.json()
  } else {
    express.json()(req, res, next);
  }
});


const ordersFilePath = path.join(process.cwd(), "orders.json");
const stripe = new Stripe();

export function updateOrderStatus(sessionId, status) {
  try {
    // Find order
    const orderIndex = orders.findIndex((order) => order.sessionId === sessionId);

    if (orderIndex === -1) {
      console.warn(`⚠️ Order with sessionId ${sessionId} not found in orders.json`);
      return false;
    }

    // Update status
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    // Write back to file
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");

    console.log(`✅ Order ${sessionId} updated to status: ${status}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to update order status:", error);
    return false;
  }
}

app.get("/", (req, res) => {
 return res.json(courses);
});

app.post("/create-checkout", async (req, res) => {
  console.log("checkout call");
  try {
    const { courseId, user } = req.body;
    console.log(courseId,user)
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return res.json({ message: "Id not found" });
    }

      let existingOrder = orders.find(
    (o) => o.user.mobile === user.mobile && o.courseId === courseId && (o.status === "pending" ||  o.status === "paid")
  );

  if (existingOrder) {
    console.log("user already exist")
    return res.json({ url: existingOrder.session_url });
  }
    // 1. Create checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: course.name,
              images: [course.image],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      return_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      metadata: {
        orderId: crypto.randomUUID(),
      userId:`${user.name}-${crypto.randomUUID()}`,
        courseId,
      },
    });

    // 2. Save order info in JSON file with "pending" status
    const newOrder = {
      orderId: session.metadata.orderId,
      session_url:session.client_secret,
      sessionId: session.id,
      user,
      courseId,
      amount: course.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    // 3. Return session client secret to frontend
    res.json({ url: session.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Express backend
app.get("/checkout-session", async (req, res) => {
  const { session_id } = req.query;
      let checkUserPayment = orders.find(
    (o) => o.sessionId === session_id && o.status === "paid"
  );

  if (checkUserPayment) {
    return res.json({ status: checkUserPayment.status ,customer_email:"sameForAll@gamil.com" ,amount_total:checkUserPayment.amount,payment_status:checkUserPayment.status});
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("checkput session ", session)
    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve session" });
  }
});

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  console.log("webhook call........")

  let endpointSecret = "whsec_HLcscWXU36jtwYqe1TQloAIU1WFFgJXE"
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];

      console.log(request.body)
  console.log(signature)
  console.log(endpointSecret)
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
  case "checkout.session.completed": {
    const session = event.data.object;
    updateOrderStatus(session.id, "paid");
    break;
  }
  case "checkout.session.async_payment_failed": {
    const session = event.data.object;
    updateOrderStatus(session.id, "failed");
    break;
  }
  case "checkout.session.async_payment_succeeded": {
    const session = event.data.object;
    updateOrderStatus(session.id, "paid");
    break;
  }
  case "checkout.session.expired": {
    const session = event.data.object;
    updateOrderStatus(session.id, "expired");
    break;
  }
  default:
    console.log(`Unhandled event type: ${event.type}`);
}
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4000, () => {
  console.log("Server started");
});
