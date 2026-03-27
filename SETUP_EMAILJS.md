# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form fully functional.

## Step 1: Create an EmailJS Account

1. Visit [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add an Email Service

1. Go to **Email Services** in your dashboard
2. Click **Add Service**
3. Choose your email provider:
   - **Gmail** (Recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or use your own custom email

### For Gmail:
- Select Gmail when creating the service
- Click **Connect Account**
- Grant EmailJS permission to send emails on your behalf
- Note your **Service ID** (looks like: `service_xxxxxxxxxxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set up the template with the following variables:

Template content example:
```
From: {{from_email}}
Name: {{from_name}}

Message:
{{message}}
```

4. Configure the template:
   - **To Email Address:** Your receiving email (e.g., ahmed.bourmeche.eng@gmail.com)
   - **Subject:** You've received a new message from {{from_name}}

5. Click **Save** and note your **Template ID** (looks like: `template_xxxxxxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys** in your dashboard
2. Copy your **Public Key** (looks like: a long alphanumeric string)

## Step 5: Configure Your Portfolio

1. Open `.env` file in `artifacts/portfolio/` directory
2. Fill in the three credentials from EmailJS:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Save the file
4. Make sure `.env` is in your `.gitignore` (it should be by default)

## Step 6: Test Your Setup

1. Start your development server: `pnpm dev`
2. Navigate to the Contact section on your portfolio
3. Fill out the form and test sending an email
4. Check your receiving email inbox

## Troubleshooting

### "EmailJS is not configured"
- Verify all three environment variables are filled in `.env`
- Restart your dev server after adding `.env` variables
- Check that the `.env` file is in `artifacts/portfolio/` directory

### Emails not sending
- Check that your EmailJS service is active (green status in dashboard)
- Verify your email template variables match what's being sent:
  - `from_name`: User's name
  - `from_email`: User's email  
  - `message`: User's message
- Check EmailJS dashboard for failed requests under **Activity**

### "Invalid Service ID" or "Invalid Template ID"
- Copy the IDs again from your EmailJS dashboard carefully
- Make sure there are no extra spaces in the `.env` file

## Email Template Variable Reference

The contact form sends the following variables to your template:

- `from_name` - Visitor's name from the form
- `from_email` - Visitor's email from the form
- `message` - The message body
- `reply_to` - Same as `from_email` for reply functionality

You can use these in your template with `{{variable_name}}` syntax.

## Production Deployment

For production, you'll need to:

1. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
2. Never commit your `.env` file to version control
3. Consider rate limiting to prevent spam

## Free Tier Limits

EmailJS free tier includes:
- 200 emails/month
- Unlimited email services
- Unlimited templates
- JavaScript SDK support

If you go beyond 200 emails/month, consider the affordable paid plans: https://www.emailjs.com/pricing/
