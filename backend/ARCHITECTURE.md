# System Architecture

## Overview

This document explains how the contact form system works.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    Index.html                           │    │
│  │  ┌──────────────────────────────────────────────┐     │    │
│  │  │         Contact Form                          │     │    │
│  │  │  • Name                                       │     │    │
│  │  │  • Email                                      │     │    │
│  │  │  • Company                                    │     │    │
│  │  │  • Message                                    │     │    │
│  │  │  [Send Message Button]                        │     │    │
│  │  └──────────────────────────────────────────────┘     │    │
│  │                        │                               │    │
│  │                        │ JavaScript Fetch API          │    │
│  │                        ▼                               │    │
│  │              POST /api/contact                         │    │
│  │              { name, email, company, message }         │    │
│  └────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTP Request
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                      BACKEND SERVER                              │
│                    (Node.js + Express)                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Middleware Stack                           │    │
│  │  1. CORS ────────────── Allow frontend origin          │    │
│  │  2. Helmet ──────────── Security headers               │    │
│  │  3. Rate Limiter ────── 5 requests / 15 min            │    │
│  │  4. Body Parser ─────── Parse JSON                     │    │
│  │  5. Validator ───────── Validate inputs                │    │
│  └────────────────────────────────────────────────────────┘    │
│                        │                                         │
│                        ▼                                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Contact Route Handler                         │    │
│  │           (routes/contact.js)                           │    │
│  │                                                          │    │
│  │  1. Validate input data                                 │    │
│  │  2. Sanitize inputs                                     │    │
│  │  3. Create Contact model                                │    │
│  │  4. Save to MongoDB ──────────┐                        │    │
│  │  5. Send email notification ──┼──────┐                 │    │
│  │  6. Return success response   │      │                 │    │
│  └────────────────────────────────┼──────┼─────────────────┘    │
└─────────────────────────────────┼──────┼───────────────────────┘
                                  │      │
                    ┌─────────────┘      └──────────────┐
                    │                                    │
                    ▼                                    ▼
    ┌───────────────────────────┐      ┌────────────────────────────┐
    │      MongoDB Database      │      │    Gmail API (OAuth2)      │
    │                            │      │                            │
    │  ┌──────────────────────┐ │      │  ┌──────────────────────┐ │
    │  │   Contacts Collection│ │      │  │  Nodemailer Transport│ │
    │  │                      │ │      │  │                      │ │
    │  │  • _id               │ │      │  │  • OAuth2 Client     │ │
    │  │  • name              │ │      │  │  • Access Token      │ │
    │  │  • email             │ │      │  │  • Refresh Token     │ │
    │  │  • company           │ │      │  └──────────────────────┘ │
    │  │  • message           │ │      │            │               │
    │  │  • status            │ │      │            ▼               │
    │  │  • ipAddress         │ │      │  ┌──────────────────────┐ │
    │  │  • userAgent         │ │      │  │   Send Email         │ │
    │  │  • createdAt         │ │      │  │   To: EMAIL_TO       │ │
    │  │  • updatedAt         │ │      │  │   From: GMAIL_USER   │ │
    │  └──────────────────────┘ │      │  │   Subject: New Form  │ │
    │                            │      │  │   Body: HTML Template│ │
    │  Indexed by:               │      │  └──────────────────────┘ │
    │  • createdAt               │      │                            │
    │  • email                   │      └────────────────────────────┘
    │  • status                  │                    │
    └────────────────────────────┘                    │
                                                      ▼
                                        ┌──────────────────────────┐
                                        │   Email Inbox            │
                                        │   (EMAIL_TO address)     │
                                        │                          │
                                        │  📧 New Contact Form     │
                                        │     Submission           │
                                        └──────────────────────────┘
```

## Data Flow

### 1. Form Submission
```
User fills form → JavaScript validates → Fetch API sends POST request
```

### 2. Backend Processing
```
Request received → Middleware checks → Validation → Sanitization
```

### 3. Database Storage
```
Create Contact model → Save to MongoDB → Get contact ID
```

### 4. Email Notification
```
Format email template → OAuth2 authentication → Send via Gmail API
```

### 5. Response
```
Success/Error response → Frontend displays message → Form reset (if success)
```

## Component Details

### Frontend (Index.html)

**Technologies:**
- HTML5
- CSS3 (with custom properties)
- Vanilla JavaScript
- Fetch API

**Responsibilities:**
- Display contact form
- Client-side validation
- Send data to backend
- Display success/error messages
- Handle loading states

### Backend (Node.js/Express)

**Technologies:**
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- Nodemailer (Email)
- express-validator (Validation)
- Helmet (Security)
- CORS (Cross-Origin)
- express-rate-limit (Rate limiting)

**Responsibilities:**
- Receive form submissions
- Validate and sanitize inputs
- Store data in database
- Send email notifications
- Provide admin API endpoints
- Handle errors gracefully

### Database (MongoDB)

**Type:** NoSQL Document Database

**Schema:**
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  company: String (optional, max 100 chars),
  message: String (required, 10-2000 chars),
  status: String (enum: new, read, replied, archived),
  ipAddress: String,
  userAgent: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- createdAt (descending) - for sorting
- email - for searching
- status - for filtering

### Email Service (Gmail OAuth2)

**Authentication:** OAuth2 with refresh token

**Configuration:**
- Client ID
- Client Secret
- Refresh Token
- Gmail API enabled

**Email Template:**
- HTML formatted
- Responsive design
- Includes all form fields
- Timestamp
- Reply-to sender's email

## Security Layers

### 1. Rate Limiting
```
5 requests per 15 minutes per IP address
Prevents spam and abuse
```

### 2. Input Validation
```
- Name: Required, max 100 chars
- Email: Required, valid format
- Company: Optional, max 100 chars
- Message: Required, 10-2000 chars
```

### 3. Input Sanitization
```
- Escape HTML entities
- Normalize email
- Trim whitespace
- Prevent XSS attacks
```

### 4. CORS Protection
```
Only allow requests from specified origins
Configurable for development/production
```

### 5. Security Headers (Helmet)
```
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security
- And more...
```

### 6. MongoDB Injection Protection
```
Mongoose automatically escapes queries
Schema validation prevents malicious data
```

## API Endpoints

### Public Endpoints

#### POST /api/contact
Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "I'm interested..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message!",
  "contactId": "65abc123..."
}
```

#### GET /api/health
Health check

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Admin Endpoints

#### GET /api/contact
Get all contacts (with pagination)

**Query Parameters:**
- status: Filter by status
- page: Page number (default: 1)
- limit: Items per page (default: 20)

#### GET /api/contact/:id
Get single contact by ID

#### PATCH /api/contact/:id/status
Update contact status

**Request:**
```json
{
  "status": "read"
}
```

#### DELETE /api/contact/:id
Delete contact by ID

## Error Handling

### Validation Errors (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "An error occurred while processing your request"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Route not found"
}
```

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/contact-form-db

# Gmail OAuth2
GMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=xxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=xxx
GMAIL_REFRESH_TOKEN=xxx

# Email
EMAIL_TO=recipient@example.com
EMAIL_FROM=your-email@gmail.com
```

## Deployment Architecture

### Development
```
Frontend: File system (Index.html)
Backend: localhost:5000
Database: Local MongoDB or Atlas
```

### Production
```
Frontend: CDN / Static hosting (Netlify, Vercel)
Backend: Cloud server (Heroku, DigitalOcean, AWS)
Database: MongoDB Atlas (cloud)
Email: Gmail API (OAuth2)
```

## Performance Considerations

### Database
- Indexed fields for fast queries
- Connection pooling
- Pagination for large datasets

### API
- Rate limiting prevents abuse
- Efficient validation
- Async/await for non-blocking operations

### Email
- Async sending (doesn't block response)
- OAuth2 token refresh handled automatically
- Graceful error handling

## Monitoring & Logging

### Console Logs
- Server start/stop
- Database connections
- Email sending status
- Errors and warnings

### Recommended Production Additions
- Winston or Bunyan for logging
- Sentry for error tracking
- PM2 for process management
- New Relic or DataDog for monitoring

## Scalability

### Current Capacity
- Handles moderate traffic
- Rate limited to prevent abuse
- Single server instance

### Scaling Options
- Load balancer for multiple instances
- Redis for session/rate limit storage
- Message queue for email sending
- CDN for static assets
- Database sharding for large datasets

---

This architecture provides a solid foundation for a production-ready contact form system with security, reliability, and maintainability in mind.
