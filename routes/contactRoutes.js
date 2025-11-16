import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Create a transporter using Gmail (or any other email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// POST route to handle form submission
router.post("/send", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).send("Missing required fields");
  }

  const mailOptions = {
    from: email, // Sender's email
    to: "ockatrust@gmail.com", // Recipient's email
    subject: `New message from ${fullName}`,
    text: `
      You have received a new message from ${fullName} (${email}, ${phone}):
      
      ${message}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

export default router;
