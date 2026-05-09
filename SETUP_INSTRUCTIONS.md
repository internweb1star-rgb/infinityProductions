# Complete Setup Instructions

## Project Overview

This project includes:
- **Frontend**: Modern one-page website with contact form
- **Backend**: Node.js/Express API with MongoDB and Gmail integration

## Quick Start

### 1. Install Node.js and MongoDB

**Node.js:**
- Download from https://nodejs.org/ (LTS version recommended)
- Verify installation: `node --version`

**MongoDB (Choose one):**

**Option A: MongoDB Atlas (Recommended - Free Cloud Database)**
- No installation needed
- Create account at https://www.mongodb.com/cloud/atlas
- Follow setup wizard in backend

**Option B: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and start the service

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run setup wizard (optional - helps configure .env)
node setup.js

# OR manually configure .env file
# Copy .env.example to .env and fill in your values

# Test email configuration
node test-email.js

# Start the server
npm run dev
```

The server will start on http://localhost:5000

### 3. Frontend Setup

The frontend is already configured! Just open `Index.html` in your browser.

**For development:**
- Use Live Server extension in VS Code, or
- Use any local web server

**Important:** The form will submit to `http://localhost:5000/api/contact`

## Gmail OAuth2 Setup (Detailed)

### Step 1: Google Cloud Console

1. Go to https://console.cloud.google.com/
2. Create a new project (e.g., "Contact Form Backend")
3. Enable Gmail API:
   - Go to "APIs & Services" > "Library"
   - Search "Gmail API"
   - Click "Enable"

### Step 2: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure consent screen if prompted:
   - User Type: External
   - Fill in required fields
   - Add your email as test user
4. Create OAuth client ID:
   - Application type: Web application
   - Name: Contact Form Backend
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Save your **Client ID** and **Client Secret**

### Step 3: Get Refresh Token

1. Go to https://developers.google.com/oauthplayground
2. Click settings icon (⚙️) in top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. Close settings
6. In left panel, select "Gmail API v1"
7. Select scope: `https://mail.google.com/`
8. Click "Authorize APIs"
9. Sign in with your Gmail account
10. Click "Allow"
11. Click "Exchange authorization code for tokens"
12. Copy the **Refresh Token**

### Step 4: Update .env File

```env
GMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
EMAIL_TO=where-to-receive-emails@example.com
EMAIL_FROM=your-email@gmail.com
```

## Testing

### Test Email Configuration

```bash
cd backend
node test-email.js
```

You should see: ✅ SUCCESS! Email sent successfully!

### Test Contact Form

1. Open `Index.html` in browser
2. Scroll to contact section
3. Fill out the form
4. Click "Send Message"
5. Check for success message
6. Check your email inbox

### View Submitted Contacts

Open `backend/admin-dashboard.html` in your browser to see all submissions.

## Project Structure

```
onepage/
├── Index.html                 # Main website
├── backend/
│   ├── server.js             # Express server
│   ├── package.json          # Dependencies
│   ├── .env                  # Configuration (create this)
│   ├── .env.example          # Configuration template
│   ├── models/
│   │   └── Contact.js        # MongoDB schema
│   ├── routes/
│   │   └── contact.js        # API routes
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── email.js          # Email configuration
│   ├── test-email.js         # Email testing script
│   ├── setup.js              # Setup wizard
│   ├── admin-dashboard.html  # View contacts
│   ├── README.md             # Backend documentation
│   └── QUICKSTART.md         # Quick start guide
└── SETUP_INSTRUCTIONS.md     # This file
```

## API Endpoints

### Public
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Admin (add authentication in production)
- `GET /api/contact` - Get all contacts
- `GET /api/contact/:id` - Get single contact
- `PATCH /api/contact/:id/status` - Update status
- `DELETE /api/contact/:id` - Delete contact

## Features

✅ Modern, responsive contact form
✅ MongoDB database storage
✅ Email notifications via Gmail OAuth2
✅ Input validation and sanitization
✅ Rate limiting (5 requests per 15 minutes)
✅ Security headers
✅ CORS protection
✅ Admin dashboard
✅ Status tracking (new, read, replied, archived)

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env file exists and has all values
- Check if port 5000 is available

### Email not sending
- Run `node test-email.js` to diagnose
- Verify all OAuth2 credentials
- Check Gmail API is enabled
- Try regenerating refresh token
- Ensure 2-step verification is enabled on Gmail

### Form submission fails
- Check backend is running on port 5000
- Open browser console for errors
- Verify CORS settings in server.js
- Check network tab in DevTools

### MongoDB connection error
- For local: Ensure MongoDB service is running
- For Atlas: Check connection string and IP whitelist
- Verify network connectivity

### CORS errors
- Update allowed origins in `server.js`
- Ensure frontend URL matches CORS config
- Check if backend is running

## Production Deployment

### Backend Deployment

1. **Choose hosting provider:**
   - Heroku (easy)
   - DigitalOcean
   - AWS
   - Vercel/Netlify (for serverless)

2. **Set environment variables:**
   - All values from .env file
   - Set `NODE_ENV=production`
   - Update CORS origins to your domain

3. **Deploy:**
   - Push code to hosting provider
   - Install dependencies
   - Start server

### Frontend Deployment

1. **Update API URL in Index.html:**
   ```javascript
   const response = await fetch('https://your-api-domain.com/api/contact', {
   ```

2. **Deploy to:**
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting

## Security Notes

⚠️ **Important for Production:**

1. Add authentication to admin endpoints
2. Use HTTPS for all connections
3. Set strong rate limits
4. Validate all inputs
5. Use environment variables for secrets
6. Enable MongoDB authentication
7. Whitelist specific IPs in MongoDB Atlas
8. Add CSRF protection
9. Implement logging and monitoring
10. Regular security updates

## Support

For issues:
1. Check console logs
2. Review error messages
3. Verify configuration
4. Test with curl or Postman
5. Check backend/README.md for detailed docs

## License

ISC

---

**Need Help?** Check the detailed README.md in the backend folder!
