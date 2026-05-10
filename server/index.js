const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = require('./db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const uploadRoutes = require('./routes/upload');
const messageRoutes = require('./routes/messages');
const quotingRoutes = require('./routes/quoting');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Serve existing project images from src/assets/images
const projectAssetsDir = path.join(__dirname, '..', 'src', 'assets', 'images');
app.use('/project-assets', express.static(projectAssetsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/quoting', quotingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In production, serve the React build
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));

  // All non-API routes serve the React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
}

// Initialize database schema on startup
async function initDatabase() {
  try {
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('✅ Database schema initialized');
  } catch (err) {
    console.error('❌ Failed to initialize database schema:', err);
    process.exit(1);
  }
}

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
});

module.exports = app;
