# Email Configuration Setup

This document explains how to configure email sending for the contact form.

## Environment Variables

The application requires the following environment variables to be set:

```
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_EMAIL=ykp.supplies@gmail.com
```

## Setting up Gmail for Sending Emails

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - In your Google Account, go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Google will generate a 16-character app password
   - Use this as your `GMAIL_APP_PASSWORD`

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root of your project
   - Add the following lines:
     ```
     GMAIL_USER=your-gmail-address@gmail.com
     GMAIL_APP_PASSWORD=your-16-character-app-password
     CONTACT_EMAIL=ykp.supplies@gmail.com
     ```

## Common Configuration Issues

### Authentication Errors (535-5.7.8)
If you see an error like:
```
535-5.7.8 Username and Password not accepted
```

This means:
1. You're using your regular Gmail password instead of an App Password
2. Your App Password is incorrect
3. 2-Factor Authentication is not enabled on your account

**Solution:**
1. Ensure 2-Factor Authentication is enabled
2. Generate a new App Password
3. Use the App Password (not your regular password) in `GMAIL_APP_PASSWORD`

### Network Connection Issues
If you see errors like:
```
ENOTFOUND mail.google.com
ECONNREFUSED
```

This means:
1. Your network connection is blocking SMTP connections
2. There's a firewall preventing access

**Solution:**
1. Check your internet connection
2. Verify that your network allows SMTP connections
3. Try using a different network

## Testing Email Configuration

You can test your email configuration by visiting:
```
GET /api/test-email
```

This endpoint will verify that:
- All required environment variables are set
- The Gmail credentials are valid
- The email service is working properly

## How It Works

1. When a user submits the contact form, the data is sent to `/api/contact`
2. The API route validates the form data
3. It uses Nodemailer to send:
   - One email to the factory (`CONTACT_EMAIL`)
   - One auto-reply to the customer
4. Both emails are formatted with Egyptian-themed HTML templates

## Troubleshooting

**Common Issues:**

1. **"Email service not configured properly"**
   - Check that `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in your environment
   - Verify that your app password is correct

2. **"Invalid login" or authentication errors**
   - Ensure 2-Factor Authentication is enabled on your Google account
   - Generate a new app password and update your environment variables
   - Make sure you're using the App Password, not your regular Gmail password

3. **Emails not being received**
   - Check your spam/junk folder
   - Verify that `CONTACT_EMAIL` is set correctly
   - Test the configuration using the `/api/test-email` endpoint

## Security Notes

- Never commit your `.env.local` file to version control
- App passwords are specific to the application and can be revoked at any time
- The `GMAIL_APP_PASSWORD` should be treated as securely as your main password
- Regularly rotate your App Passwords for security