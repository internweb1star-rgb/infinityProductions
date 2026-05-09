# Contact Form Backend

A complete Node.js/Express backend for handling contact form submissions with MongoDB storage and Gmail email notifications using OAuth2.

## Features

- ✅ RESTful API with Express.js
- ✅ MongoDB database for storing contact submissions
- ✅ Gmail integration with OAuth2 (2-step verification)
- ✅ Email notifications for new submissions
- ✅ Input validation and sanitization
- ✅ Rate limiting to prevent spam
- ✅ Security headers with Helmet
- ✅ CORS enabled
- ✅ Error handling
- ✅ Admin endpoints for managing contacts

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account with 2-step verification enabled

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up MongoDB:**

   **Option A: Local MongoDB**
   - Install MongoDB from https://www.mongodb.com/try/download/community
   - Start MongoDB service:
     ```bash
     # Windows
     net start MongoDB
     
     # macOS/Linux
     sudo systemctl start mongod
     ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Update MONGODB_URI in .env file

3. **Configure Gmail OAuth2:**

   Follow these steps to enable Gmail API with OAuth2:

   **Step 1: Create Google Cloud Project**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing one
   - Name it (e.g., "Contact Form Mailer")

   **Step 2: Enable Gmail API**
   - In the Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

   **Step 3: Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure OAuth consent screen:
     - User Type: External
     - App name: Your app name
     - User support email: Your email
     - Developer contact: Your email
     - Save and continue through all steps
   - Application type: "Web application"
   - Name: "Contact Form Backend"
   - Authorized redirect URIs: Add `https://developers.google.com/oauthplayground`
   - Click "Create"
   - **Save your Client ID and Client Secret**

   **Step 4: Get Refresh Token**
   - Go to https://developers.google.com/oauthplayground
   - Click the settings icon (⚙️) in the top right
   - Check "Use your own OAuth credentials"
   - Enter your Client ID and Client Secret
   - Close settings
   - In the left panel, find "Gmail API v1"
   - Select `https://mail.google.com/`
   - Click "Authorize APIs"
   - Sign in with your Gmail account
   - Click "Allow"
   - Click "Exchange authorization code for tokens"
   - **Copy the Refresh Token**

   **Step 5: Update .env file**
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   EMAIL_TO=recipient@example.com
   EMAIL_FROM=your-email@gmail.com
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update all values with your actual credentials

## Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Public Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "I'm interested in your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "contactId": "65abc123..."
}
```

#### Health Check
```http
GET /api/health
```

### Admin Endpoints

#### Get All Contacts
```http
GET /api/contact?status=new&page=1&limit=20
```

#### Get Single Contact
```http
GET /api/contact/:id
```

#### Update Contact Status
```http
PATCH /api/contact/:id/status
Content-Type: application/json

{
  "status": "read"
}
```

Status options: `new`, `read`, `replied`, `archived`

#### Delete Contact
```http
DELETE /api/contact/:id
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: All inputs are validated and sanitized
- **Helmet**: Security headers enabled
- **CORS**: Configured for specific origins
- **MongoDB Injection Protection**: Using Mongoose with validation

## Database Schema

```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  company: String (optional, max 100 chars),
  message: String (required, 10-2000 chars),
  status: String (enum: new, read, replied, archived),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Email Template

The system sends beautifully formatted HTML emails with:
- Gradient header
- All form fields
- Timestamp
- Reply-to set to sender's email
- Plain text fallback

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- For Atlas, whitelist your IP address

### Email Not Sending
- Verify Gmail OAuth2 credentials
- Check refresh token is valid
- Ensure Gmail API is enabled
- Check console for error messages
- Try regenerating refresh token

### CORS Errors
- Update allowed origins in server.js
- Ensure frontend URL matches CORS configuration

### Rate Limit Issues
- Adjust limits in server.js if needed
- Clear rate limit: restart server

## Production Deployment

1. **Update environment variables:**
   - Set `NODE_ENV=production`
   - Update CORS origins to your domain
   - Use MongoDB Atlas for database

2. **Deploy to hosting service:**
   - Heroku, DigitalOcean, AWS, etc.
   - Set environment variables in hosting dashboard
   - Ensure MongoDB connection string is correct

3. **Update frontend:**
   - Change API URL from localhost to your production URL
   - Update in Index.html fetch call

## Testing

Test the API with curl:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "message": "This is a test message"
  }'
```

## Support

For issues or questions, check:
- MongoDB connection logs
- Email configuration
- Console error messages
- Network requests in browser DevTools

## License

ISC
