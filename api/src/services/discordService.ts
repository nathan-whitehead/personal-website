import dotenv from "dotenv";

dotenv.config();

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function sendContactToDiscord(data: ContactForm): Promise<void> {
  const { name, email, message } = data;

  // Get webhook URL from environment variable
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Discord webhook URL not configured");
  }

  // Format message for Discord
  const embed = {
    title: "📬 New Contact Form Submission",
    color: 0x0099ff, // Blue color
    fields: [
      {
        name: "👤 Name",
        value: name,
        inline: true,
      },
      {
        name: "📧 Email",
        value: email,
        inline: true,
      },
      {
        name: "💬 Message",
        value: message,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  const payload = {
    embeds: [embed],
  };

  // Send to Discord webhook
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Discord API error: ${response.status} ${error}`);
  }
}
