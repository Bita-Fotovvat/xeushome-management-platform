const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyAdmin } = require('../middleware/auth'); 
// Assuming auth middleware exists if we want to protect, but for MVP let's implement basic endpoints

// GET /api/quoting/materials/roots
// Get all root categories (parent_id IS NULL)
router.get('/materials/roots', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM quote_materials WHERE parent_id IS NULL ORDER BY name ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching root materials:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/quoting/materials/:parentId/children
// Get children for a specific node
router.get('/materials/:parentId/children', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM quote_materials WHERE parent_id = $1 ORDER BY id ASC',
      [req.params.parentId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching child materials:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/quoting/materials/:id
// Update a material (e.g., updating manual unit price or coverage value)
router.put('/materials/:id', async (req, res) => {
  try {
    const { unit_price, calculation_type, coverage_value, unit_type, name } = req.body;
    const result = await pool.query(
      `UPDATE quote_materials 
       SET unit_price = $1, calculation_type = $2, coverage_value = $3, unit_type = $4, name = COALESCE($5, name)
       WHERE id = $6 RETURNING *`,
      [unit_price, calculation_type, coverage_value, unit_type, name, req.params.id]
    );
    if(result.rows.length === 0) return res.status(404).json({ error: "Material not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating material:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/quoting/materials
// Add a new material or category folder
router.post('/materials', async (req, res) => {
  try {
    const { parent_id, name, calculation_type, coverage_value, unit_price, unit_type } = req.body;
    const result = await pool.query(
      `INSERT INTO quote_materials (parent_id, name, calculation_type, coverage_value, unit_price, unit_type) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [parent_id || null, name, calculation_type || 'direct', coverage_value || null, unit_price || null, unit_type || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating material:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/quoting/materials/:id
// Delete a material (cascades down inherently)
router.delete('/materials/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM quote_materials WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/quoting/quotes
// Save a newly generated Quote
router.post('/quotes', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { client_name, client_email, client_phone, project_address, project_type, grand_total, line_items } = req.body;
    
    // Insert quote
    const quoteRes = await client.query(
      `INSERT INTO quotes (client_name, client_email, client_phone, project_address, project_type, grand_total)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [client_name, client_email, client_phone, project_address, project_type, grand_total]
    );
    const quoteId = quoteRes.rows[0].id;
    
    // Insert line items
    for(const item of line_items){
        await client.query(
            `INSERT INTO quote_line_items (quote_id, material_id, override_name, input_length, input_width, input_quantity, calculated_quantity, unit_price, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [quoteId, item.material_id || null, item.override_name, item.input_length || null, item.input_width || null, item.input_quantity || null, item.calculated_quantity, item.unit_price, item.total_price]
        );
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, quote_id: quoteId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error saving quote:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// GET /api/quoting/quotes
// List all generated quotes
router.get('/quotes', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching quotes:', err);
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
