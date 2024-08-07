const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;  // You can set the port through environment variable or default to 3000

app.use(bodyParser.json());

// Generate distinct ID for a new user
function generateDistinctId() {
  return crypto.randomBytes(16).toString('hex');
}

// Generate subscriber ID from distinct ID
function hmacRawUrlSafeBase64String(distinctId, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(distinctId)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Route to create a new user and generate distinct ID
app.post('/create-user', (req, res) => {
  const distinctId = generateDistinctId();
  res.json({ distinctId });
});

// Route to subscribe a user
app.post('/subscribe', (req, res) => {
  const { distinctId, secret } = req.body;

  if (!distinctId || !secret) {
    return res.status(400).json({ error: 'Missing distinctId or secret' });
  }

  const subscriberId = hmacRawUrlSafeBase64String(distinctId, secret);

  // Here you would handle the subscription logic with SuperSend or similar service
  // For demonstration, we just return the subscriberId
  res.json({ subscriberId });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
