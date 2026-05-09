require('dotenv').config();
const { sendContactEmail } = require('./config/email');

// Test email configuration
const testEmailSetup = async () => {
  console.log('\n🧪 Testing Email Configuration...\n');

  // Check if all required env variables are set
  const requiredVars = [
    'GMAIL_USER',
    'GMAIL_CLIENT_ID',
    'GMAIL_CLIENT_SECRET',
    'GMAIL_REFRESH_TOKEN',
    'EMAIL_TO',
    'EMAIL_FROM'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease update your .env file with all required values.\n');
    process.exit(1);
  }

  console.log('✓ All environment variables are set\n');

  // Test data
  const testContact = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message to verify email configuration is working correctly.'
  };

  try {
    console.log('Sending test email...\n');
    const result = await sendContactEmail(testContact);
    
    console.log('✅ SUCCESS! Email sent successfully!');
    console.log(`   Message ID: ${result.messageId}`);
    console.log(`\n📧 Check your inbox at: ${process.env.EMAIL_TO}\n`);
    
  } catch (error) {
    console.error('❌ FAILED to send email\n');
    console.error('Error details:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Verify your Gmail OAuth2 credentials are correct');
    console.error('2. Make sure Gmail API is enabled in Google Cloud Console');
    console.error('3. Try regenerating the refresh token');
    console.error('4. Check if 2-step verification is enabled on your Gmail account\n');
    process.exit(1);
  }
};

testEmailSetup();
