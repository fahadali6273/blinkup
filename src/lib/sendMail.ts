import nodemailer from "nodemailer";

export default async function sendEmail(subject: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ["info@blinkuphome.com", "support@blinkuphome.com"],
      subject,
      text: message,
    });

    console.log("📧 Email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}
