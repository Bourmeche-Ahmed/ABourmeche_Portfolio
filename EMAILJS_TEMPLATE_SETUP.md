# EmailJS Template Setup - Display Sender Info

## Overview
Your contact form already sends the sender's name, email, and message to EmailJS. You just need to update your template to display these properly.

## Update Your EmailJS Template

1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. Navigate to **Email Templates**
3. Click on your template `template_np6qbg9`
4. Update the template content to include sender information

## Template Content Example

### Subject Line
```
You've received a new message from {{from_name}}
```

### Email Body
Copy and paste this template:

```
Hello!

You have received a new contact message from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 SENDER INFORMATION

Name: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MESSAGE

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{reply_to}}
```

### HTML Template (Optional - for styled emails)

If you want a nicely formatted HTML email, use this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #007bff; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 5px 5px; }
    .sender-info { background-color: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 20px; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #28a745; }
    strong { color: #007bff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Portfolio Contact Message</h2>
    </div>
    
    <div class="content">
      <div class="sender-info">
        <h3>📧 Sender Information</h3>
        <p><strong>Name:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
      </div>
      
      <div class="message-box">
        <h3>💬 Message</h3>
        <p>{{message}}</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Reply to: {{reply_to}}</p>
      <p>This message was sent from your portfolio contact form.</p>
    </div>
  </div>
</body>
</html>
```

## Steps to Update

1. Open your template in EmailJS
2. Clear the current template content
3. Paste one of the templates above (plain text or HTML)
4. Click **Save**
5. Test by sending a message from your portfolio contact form

## Variables Available

These are the variables sent from your contact form:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email address
- `{{message}}` - The message content
- `{{reply_to}}` - Same as from_email (for easy reply)

## Testing

1. Go to http://localhost:5173 (your portfolio)
2. Scroll to Contact section
3. Fill in the form with test data
4. Click "Send Message"
5. Check your inbox for the email with sender info displayed

Now you should receive emails showing the sender's name and email address!
