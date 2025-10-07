// Test script to validate email functionality
// This is just for reference - not required for the application to run

import nodemailer from 'nodemailer';

// This test function shows how the email service works
async function testEmailConfiguration() {
  // Get SMTP configuration from environment variables
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const smtpTo = process.env.SMTP_TO_EMAIL;

  console.log('SMTP Configuration:');
  console.log('- Host:', smtpHost);
  console.log('- Port:', smtpPort);
  console.log('- User:', smtpUser);
  console.log('- From:', smtpFrom);
  console.log('- To:', smtpTo);

  if (!smtpUser || !smtpPass || !smtpTo) {
    console.error('Missing required SMTP configuration. Please set SMTP_USER, SMTP_PASS, and SMTP_TO_EMAIL in your .env file.');
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Test connection
    await transporter.verify();
    console.log('✅ SMTP configuration is valid and server is ready to send emails');
  } catch (error) {
    console.error('❌ Error with SMTP configuration:', error);
  }
}

// Run the test
testEmailConfiguration();