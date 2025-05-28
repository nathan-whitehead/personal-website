// api/src/services/emailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendContactEmail(data: ContactForm): Promise<void> {
  const { name, email, message } = data;

  // Configure email options
  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECIPIENT,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <h3>Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
</div>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
