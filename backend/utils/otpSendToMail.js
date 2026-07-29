const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification OTP",
    html: `
            <div style="font-family:Arial">
                <h2>Email Verification</h2>

                <p>Your verification code is</p>

                <h1>${otp}</h1>

                <p>This OTP will expire in 5 minutes.</p>
            </div>
        `,
  });
};

module.exports = sendOtp;
