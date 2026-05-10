const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/projects - List all projects (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    let query = `
      SELECT p.*, 
        COALESCE(
          json_agg(
            json_build_object('id', pi.id, 'image_url', pi.image_url, 'alt_text', pi.alt_text, 'display_order', pi.display_order)
            ORDER BY pi.display_order
          ) FILTER (WHERE pi.id IS NOT NULL), 
          '[]'
        ) as images
      FROM projects p
      LEFT JOIN project_images pi ON p.id = pi.project_id
    `;

    const conditions = [];
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      conditions.push(`p.category = $${params.length}`);
    }

    if (featured === 'true') {
      conditions.push('p.featured = true');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY p.id ORDER BY p.display_order ASC, p.created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:slug - Get single project (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const projectResult = await pool.query('SELECT * FROM projects WHERE slug = $1', [slug]);

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = projectResult.rows[0];

    const imagesResult = await pool.query(
      'SELECT * FROM project_images WHERE project_id = $1 ORDER BY display_order ASC',
      [project.id]
    );

    project.images = imagesResult.rows;

    // Also fetch related projects (same category, excluding current)
    const relatedResult = await pool.query(
      `SELECT id, slug, title, location, category, cover_image 
       FROM projects 
       WHERE category = $1 AND id != $2 
       ORDER BY display_order ASC 
       LIMIT 3`,
      [project.category, project.id]
    );

    project.relatedProjects = relatedResult.rows;

    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - Create new project (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, slug, location, category, meta_description, description, cover_image, tags, completed_date, featured, display_order, images } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }

    // Check if slug already exists
    const existing = await pool.query('SELECT id FROM projects WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'A project with this slug already exists' });
    }

    const result = await pool.query(
      `INSERT INTO projects (title, slug, location, category, meta_description, description, cover_image, tags, completed_date, featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [title, slug, location || '', category || '', meta_description || '', description || '', cover_image || '', tags || [], completed_date || '', featured || false, display_order || 0]
    );

    const project = result.rows[0];

    // Insert images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await pool.query(
          'INSERT INTO project_images (project_id, image_url, alt_text, display_order) VALUES ($1, $2, $3, $4)',
          [project.id, images[i].image_url, images[i].alt_text || '', i]
        );
      }
    }

    // Fetch the complete project with images
    const imagesResult = await pool.query(
      'SELECT * FROM project_images WHERE project_id = $1 ORDER BY display_order',
      [project.id]
    );
    project.images = imagesResult.rows;

    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, location, category, meta_description, description, cover_image, tags, completed_date, featured, display_order, images } = req.body;

    // Check project exists
    const existing = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check slug uniqueness if changed
    if (slug && slug !== existing.rows[0].slug) {
      const slugCheck = await pool.query('SELECT id FROM projects WHERE slug = $1 AND id != $2', [slug, id]);
      if (slugCheck.rows.length > 0) {
        return res.status(409).json({ error: 'A project with this slug already exists' });
      }
    }

    const result = await pool.query(
      `UPDATE projects SET 
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        location = COALESCE($3, location),
        category = COALESCE($4, category),
        meta_description = COALESCE($5, meta_description),
        description = COALESCE($6, description),
        cover_image = COALESCE($7, cover_image),
        tags = COALESCE($8, tags),
        completed_date = COALESCE($9, completed_date),
        featured = COALESCE($10, featured),
        display_order = COALESCE($11, display_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *`,
      [title, slug, location, category, meta_description, description, cover_image, tags, completed_date, featured, display_order, id]
    );

    const project = result.rows[0];

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      await pool.query('DELETE FROM project_images WHERE project_id = $1', [id]);

      // Insert new images
      for (let i = 0; i < images.length; i++) {
        await pool.query(
          'INSERT INTO project_images (project_id, image_url, alt_text, display_order) VALUES ($1, $2, $3, $4)',
          [id, images[i].image_url, images[i].alt_text || '', i]
        );
      }
    }

    // Fetch updated images
    const imagesResult = await pool.query(
      'SELECT * FROM project_images WHERE project_id = $1 ORDER BY display_order',
      [id]
    );
    project.images = imagesResult.rows;

    res.json(project);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully', project: result.rows[0] });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
