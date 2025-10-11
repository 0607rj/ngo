// Using Formspree - No SMTP configuration needed!

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide name, email, and message",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address",
      });
    }

    // Send email using Formspree
    const formspreeResponse = await fetch(process.env.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject: subject || "No Subject",
        message,
        _replyto: email, // Formspree will use this as reply-to
        _subject: `New Contact Form: ${subject || "No Subject"}`,
      }),
    });

    if (!formspreeResponse.ok) {
      throw new Error(`Formspree error: ${formspreeResponse.status}`);
    }

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again later.",
    });
  }
};
