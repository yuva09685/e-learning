# Gmail Setup for Production Email

To use Gmail for sending inquiry emails from your form, you need to configure an App Password. This is required because Gmail doesn't allow regular passwords for application access.

## Step-by-Step Setup Guide

### 1. Enable 2-Factor Authentication
- Go to your [Google Account settings](https://myaccount.google.com/)
- Navigate to Security > 2-Step Verification
- Follow the prompts to enable 2FA (if not already enabled)

### 2. Generate an App Password
- Go back to your [Google Account settings](https://myaccount.google.com/)
- Navigate to Security > App passwords
- Select "Mail" as the app and "Other (Custom name)" for the device
- Name it something like "Learning Inquiry Form"
- Google will generate a 16-character password

### 3. Update Environment Variables
In your `.env` file, update these values:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_actual_gmail_address@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM=your_actual_gmail_address@gmail.com
SMTP_TO_EMAIL=recipient_email@yourcompany.com
```

### 4. Additional Gmail Considerations

**Sending Limits:**
- Gmail free accounts: 500 emails/day
- G Suite accounts: 2,000 emails/day

**Best Practices:**
- Monitor your sending rate to avoid being flagged
- Test with your own email first to verify everything works
- Consider the reputation of your Gmail account affects deliverability

### 5. Security Notes
- Never commit your .env file to version control
- Keep your App Password secure
- Rotate your App Password periodically for security

### 6. Troubleshooting
If emails aren't sending:
- Verify your App Password is correct
- Ensure 2FA is enabled on your account
- Check that your Gmail account isn't being throttled
- Look for any security warnings in your Google Account activity