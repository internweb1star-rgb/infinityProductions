const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Contact Form Backend Setup Wizard    ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('This wizard will help you configure your backend.\n');

  try {
    // MongoDB Configuration
    console.log('📦 MongoDB Configuration\n');
    const useAtlas = await question('Use MongoDB Atlas (cloud)? (y/n): ');
    
    let mongoUri;
    if (useAtlas.toLowerCase() === 'y') {
      console.log('\n1. Go to https://www.mongodb.com/cloud/atlas');
      console.log('2. Create a free account and cluster');
      console.log('3. Get your connection string\n');
      mongoUri = await question('Enter MongoDB Atlas connection string: ');
    } else {
      mongoUri = 'mongodb://localhost:27017/contact-form-db';
      console.log(`Using local MongoDB: ${mongoUri}\n`);
    }

    // Gmail Configuration
    console.log('\n📧 Gmail OAuth2 Configuration\n');
    console.log('Follow these steps:');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create project and enable Gmail API');
    console.log('3. Create OAuth 2.0 credentials');
    console.log('4. Use OAuth Playground to get refresh token\n');
    console.log('See README.md for detailed instructions.\n');

    const gmailUser = await question('Gmail address: ');
    const clientId = await question('OAuth Client ID: ');
    const clientSecret = await question('OAuth Client Secret: ');
    const refreshToken = await question('Refresh Token: ');
    const emailTo = await question('Email address to receive notifications: ');

    // Server Configuration
    console.log('\n⚙️  Server Configuration\n');
    const port = await question('Server port (default 5000): ') || '5000';

    // Create .env file
    const envContent = `# Server Configuration
PORT=${port}
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=${mongoUri}

# Gmail OAuth2 Configuration
GMAIL_USER=${gmailUser}
GMAIL_CLIENT_ID=${clientId}
GMAIL_CLIENT_SECRET=${clientSecret}
GMAIL_REFRESH_TOKEN=${refreshToken}

# Email Configuration
EMAIL_TO=${emailTo}
EMAIL_FROM=${gmailUser}
`;

    fs.writeFileSync(path.join(__dirname, '.env'), envContent);

    console.log('\n✅ Configuration saved to .env file!\n');
    console.log('Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Test email: node test-email.js');
    console.log('3. Start server: npm run dev\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();
