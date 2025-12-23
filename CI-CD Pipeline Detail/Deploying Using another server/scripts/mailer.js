import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendMail(subject, text) {
  await transporter.sendMail({
    from: `"CI/CD Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject,
    text
  });
}


