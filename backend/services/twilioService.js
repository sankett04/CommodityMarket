require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendVerificationToken = async (phoneNumber) => {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    return verification;
  } catch (error) {
    throw new Error('Failed to send verification code');
  }
};

const verifyToken = async (phoneNumber, code) => {
  try {
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: phoneNumber, code: code });
    return verification_check;
  } catch (error) {
    throw new Error('Failed to verify code');
  }
};

module.exports = {
  sendVerificationToken,
  verifyToken
};
