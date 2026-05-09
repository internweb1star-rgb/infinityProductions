# Quick Start Guide

## 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Setup MongoDB

**Easy Option - MongoDB Atlas (Free Cloud Database):**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster (M0)
4. Click "Connect" > "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Paste in `.env` file as `MONGODB_URI`

**Local Option:**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Use default connection: `mongodb://localhost:27017/contact-form-db`

## 3. Setup Gmail OAuth2

### Quick Steps:

1. **Google Cloud Console** (https://console.cloud.google.com/)
   - Create new project
   - Enable Gmail API
   - Create OAuth 2.0 credentials
   - Add redirect URI: `https://developers.google.com/oauthplayground`
   - Save Client ID and Client Secret

2. **OAuth Playground** (https://developers.google.com/oauthplayground)
   - Click settings ⚙️
   - Check "Use your own OAuth credentials"
   - Enter Client ID and Client Secret
   - Select Gmail API scope: `https://mail.google.com/`
   - Authorize and get Refresh Token

3. **Update .env file:**
```env
GMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
EMAIL_TO=where-to-receive@example.com
EMAIL_FROM=your-email@gmail.com
```

## 4. Start the Server

```bash
npm run dev
```

You should see:
```
✓ MongoDB Connected
✓ Email server is ready
Server running on port 5000
```

## 5. Test It

Open your `Index.html` in a browser and submit the contact form!

## Common Issues

**MongoDB Connection Failed:**
- Check if MongoDB is running
- Verify connection string in .env

**Email Not Sending:**
- Verify all Gmail OAuth2 credentials
- Make sure Gmail API is enabled
- Try regenerating the refresh token

**CORS Error:**
- Check if backend is running on port 5000
- Verify frontend URL in server.js CORS config

## Need Help?

Check the full README.md for detailed instructions!
