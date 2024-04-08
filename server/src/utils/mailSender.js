import nodemailer from "nodemailer";

const sendOtpMail = async (email, username, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });

    let message = {
      from: '"GADGET NEPAL" <your_email@gmail.com>',
      to: `${email}`,
      subject: `Your Code - ${otp}`,
      text: `Dear ${username},

      Your code is: ${otp}. Use it to access your account.
      
      If you didn't request this, simply ignore this message.
      
      Yours,
      The GADGET NEPAL`,
      html: `<p>Dear ${username},</p>
      <p>Your code is: <strong style='color:red'>${otp}</strong>. Use it to access your account.</p>
      <p>If you didn't request this, simply ignore this message.</p>
      <p>Yours,<br/>The GADGET NEPAL</p>`,
    };

    const info = await transporter.sendMail(message);
    if (info.messageId) {
      console.log("Email sent successfully");
      return info.messageId;
    } else {
      console.error("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendOtpMail;
