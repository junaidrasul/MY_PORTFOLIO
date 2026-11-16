const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { status: 'error', message: 'Rate limit exceeded. Try again shortly.' }
});

app.use('/api/', apiLimiter);
app.use(express.static(path.join(__dirname, '..')));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    architect: 'Muhammad Junaid Rasul',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, scope, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }
  console.log(`[ENTERPRISE INQUIRY] ${name} <${email}> | ${scope}: ${message}`);
  return res.status(201).json({ status: 'success', message: 'Inquiry transmitted.' });
});

app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));
