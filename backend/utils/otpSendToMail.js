const transporter = require("../config/nodemailer");

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: `"Titto Live" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: "Your Titto Live verification code",

    text: `
      Your Titto Live verification code is: ${otp}

      This code will expire in 5 minutes.

      If you did not request this code, please ignore this email.
    `.trim(),

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: 0 auto;
        padding: 30px;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
      ">

        <h2>Titto Live</h2>

        <p>Your verification code is:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          padding: 15px 0;
        ">
          ${otp}
        </div>

        <p>
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <p style="color: #6b7280;">
          If you did not request this code, please ignore this email.
        </p>

        <p>
          Thanks,<br />
          Titto Live Team
        </p>

      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendOtp;
