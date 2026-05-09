# Setup Checklist

Use this checklist to ensure everything is configured correctly.

## Prerequisites

- [ ] Node.js installed (v14 or higher)
  - Check: `node --version`
- [ ] npm installed
  - Check: `npm --version`
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Gmail account with 2-step verification enabled

## Installation

- [ ] Navigated to backend folder: `cd backend`
- [ ] Installed dependencies: `npm install`
- [ ] All packages installed without errors

## MongoDB Configuration

Choose one:

### Option A: MongoDB Atlas (Cloud)
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Whitelisted IP address (or allow all: 0.0.0.0/0)
- [ ] Created database user
- [ ] Copied connection string
- [ ] Updated MONGODB_URI in .env

### Option B: Local MongoDB
- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Can connect to: `mongodb://localhost:27017`
- [ ] Updated MONGODB_URI in .env

## Gmail OAuth2 Configuration

### Google Cloud Console
- [ ] Created Google Cloud project
- [ ] Enabled Gmail API
- [ ] Created OAuth 2.0 credentials (Web application)
- [ ] Added redirect URI: `https://developers.google.com/oauthplayground`
- [ ] Saved Client ID
- [ ] Saved Client Secret

### OAuth Playground
- [ ] Opened https://developers.google.com/oauthplayground
- [ ] Clicked settings and enabled "Use your own OAuth credentials"
- [ ] Entered Client ID and Client Secret
- [ ] Selected Gmail API scope: `https://mail.google.com/`
- [ ] Authorized APIs
- [ ] Exchanged authorization code for tokens
- [ ] Copied Refresh Token

### Environment Variables
- [ ] Created .env file (copied from .env.example)
- [ ] Set GMAIL_USER
- [ ] Set GMAIL_CLIENT_ID
- [ ] Set GMAIL_CLIENT_SECRET
- [ ] Set GMAIL_REFRESH_TOKEN
- [ ] Set EMAIL_TO (where to receive notifications)
- [ ] Set EMAIL_FROM (same as GMAIL_USER)

## Testing

- [ ] Tested email configuration: `npm run test-email`
  - [ ] Saw "✅ SUCCESS! Email sent successfully!"
  - [ ] Received test email in inbox
- [ ] Started server: `npm run dev`
  - [ ] Saw "✓ MongoDB Connected"
  - [ ] Saw "Server running on port 5000"
  - [ ] No errors in console

## Frontend Testing

- [ ] Opened Index.html in browser
- [ ] Scrolled to contact section
- [ ] Filled out contact form:
  - [ ] Name field
  - [ ] Email field
  - [ ] Company field
  - [ ] Message field
- [ ] Clicked "Send Message"
- [ ] Saw success message
- [ ] Received email notification
- [ ] Checked admin dashboard (backend/admin-dashboard.html)
- [ ] Saw contact in dashboard

## API Testing (Optional)

- [ ] Tested health endpoint: `curl http://localhost:5000/api/health`
- [ ] Tested contact submission with curl or Postman
- [ ] Verified response is JSON
- [ ] Checked MongoDB for saved contact

## Production Preparation (When Ready)

- [ ] Updated CORS origins in server.js
- [ ] Set NODE_ENV=production
- [ ] Updated API URL in Index.html
- [ ] Tested on production environment
- [ ] Added authentication to admin endpoints
- [ ] Enabled HTTPS
- [ ] Set up monitoring/logging
- [ ] Configured backup for MongoDB

## Troubleshooting

If something doesn't work, check:

- [ ] All environment variables are set correctly
- [ ] MongoDB is running and accessible
- [ ] Gmail OAuth2 credentials are valid
- [ ] Port 5000 is not in use
- [ ] No firewall blocking connections
- [ ] Browser console for frontend errors
- [ ] Terminal for backend errors
- [ ] Network tab in DevTools

## Common Issues

### MongoDB Connection Failed
- [ ] Verified MongoDB is running
- [ ] Checked connection string format
- [ ] For Atlas: Whitelisted IP address
- [ ] For Atlas: Verified username/password

### Email Not Sending
- [ ] Ran test-email.js to diagnose
- [ ] Verified all OAuth2 credentials
- [ ] Checked Gmail API is enabled
- [ ] Tried regenerating refresh token
- [ ] Verified 2-step verification is enabled

### Form Submission Fails
- [ ] Backend is running on port 5000
- [ ] Checked browser console for errors
- [ ] Verified CORS settings
- [ ] Checked network tab in DevTools

### Rate Limit Reached
- [ ] Waited 15 minutes
- [ ] Restarted server to reset
- [ ] Adjusted limits in server.js if needed

## Success Criteria

You're all set when:

✅ Backend starts without errors
✅ Test email sends successfully
✅ Contact form submits successfully
✅ Email notification received
✅ Contact appears in admin dashboard
✅ No errors in browser console
✅ No errors in terminal

---

**Need Help?**
- See README.md for detailed documentation
- See QUICKSTART.md for quick start guide
- See SETUP_INSTRUCTIONS.md for comprehensive setup

**Still stuck?**
- Check console logs for error messages
- Verify all environment variables
- Try the test-email.js script
- Review the troubleshooting section in README.md
