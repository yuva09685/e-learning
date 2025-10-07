import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, course, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, or phone' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Get Gmail SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const smtpTo = process.env.SMTP_TO_EMAIL;

    // Validate required environment variables
    if (!smtpUser || !smtpPass || !smtpTo) {
      return res.status(500).json({ 
        success: false,
        error: 'Email service is not properly configured. Missing SMTP_USER, SMTP_PASS, or SMTP_TO_EMAIL.' 
      });
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass, // This should be an App Password, not your regular Gmail password
      },
    });

    // Verify the connection works
    await transporter.verify();

    // Create email options
    const mailOptions = {
      from: `"Inquiry Form" <${smtpFrom}>`, // Use a friendly name
      to: smtpTo,
      replyTo: email, // Allow replies to go to the inquirer
      subject: `New Learning Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Learning Inquiry
          </h2>
          <div style="margin: 20px 0;">
            <h3 style="color: #34495e;">Inquiry Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Course of Interest:</strong> ${course}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          <div style="margin-top: 30px; padding: 10px; background-color: #f8f9fa; border-left: 4px solid #3498db;">
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Inquiry submitted successfully' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Return more specific error messages
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        success: false, 
        error: 'Authentication failed. Please check your SMTP credentials. For Gmail, make sure you are using an App Password, not your regular password.' 
      });
    } else if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ 
        success: false, 
        error: 'Could not connect to the SMTP server. Please check your SMTP settings.' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to send inquiry email' 
      });
    }
  }
}