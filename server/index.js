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

// Dynamic sitemap.xml - includes all project pages from DB
app.get('/sitemap.xml', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT slug, updated_at FROM projects ORDER BY display_order ASC, created_at DESC'
    );

    const today = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    xml += `  <url>
    <loc>https://xeushome.ca/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;

    xml += `  <url>
    <loc>https://xeushome.ca/our-projects</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;

    xml += `  <url>
    <loc>https://xeushome.ca/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

    xml += `  <url>
    <loc>https://xeushome.ca/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

    xml += `  <url>
    <loc>https://xeushome.ca/contact-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>\n`;

    // Blog article pages
    const blogSlugs = [
      'how-to-choose-renovation-contractor-hamilton-gta',
      'what-to-expect-during-home-renovation-ontario'
    ];

    for (const blogSlug of blogSlugs) {
      xml += `  <url>
    <loc>https://xeushome.ca/blog/${blogSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    }

    // Dynamic project pages
    for (const project of result.rows) {
      const lastmod = project.updated_at
        ? new Date(project.updated_at).toISOString().split('T')[0]
        : today;

      xml += `  <url>
    <loc>https://xeushome.ca/our-projects/${project.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    }

    xml += '</urlset>';

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Error generating sitemap:', err);
    res.status(500).send('Failed to generate sitemap');
  }
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
