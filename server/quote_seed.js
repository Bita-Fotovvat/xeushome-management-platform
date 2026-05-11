const pool = require('./db');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MATERIAL_TREE = [
  {
    name: 'Sheet (Drywall / Cement / Plywood)',
    children: [
      {
        name: 'Regular Drywall',
        children: [
          { name: '4ft x 8ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 10ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 9ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 12ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 8ft x 3/8inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 }
        ]
      },
      {
        name: 'Green Drywall',
        children: [
          { name: '4ft x 8ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 10ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 9ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 12ft x 1/2inch', calculation_type: 'linear', coverage_value: 4, unit_type: 'sheet', unit_price: 0 }
        ]
      },
      {
        name: 'Cement Board',
        children: [
            {
                name: 'Wall',
                children: [
                    { name: '4ft x 8ft x 1/2inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 },
                    { name: '3ft x 6ft x 1/2inch', calculation_type: 'area', coverage_value: 18, unit_type: 'sheet', unit_price: 0 },
                    { name: '3ft x 6ft x 1/4inch', calculation_type: 'area', coverage_value: 18, unit_type: 'sheet', unit_price: 0 }
                ]
            },
            {
                name: 'Floor',
                children: [
                    { name: '4ft x 8ft x 1/4inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 },
                    { name: '3ft x 6ft x 1/4inch', calculation_type: 'area', coverage_value: 18, unit_type: 'sheet', unit_price: 0 }
                ]
            }
        ]
      },
      {
        name: 'Plywood',
        children: [
          { name: '4ft x 8ft x 1/2inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 8ft x 1/4inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 8ft x 3/8inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 },
          { name: '4ft x 8ft x 5/8inch', calculation_type: 'area', coverage_value: 32, unit_type: 'sheet', unit_price: 0 }
        ]
      }
    ]
  },
  {
    name: 'Framing / Lumber',
    children: [
      { name: '2inch x 4inch x 8ft', calculation_type: 'framing', coverage_value: 8, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 4inch x 12ft', calculation_type: 'framing', coverage_value: 12, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 4inch x 10ft', calculation_type: 'framing', coverage_value: 10, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 6inch x 8ft', calculation_type: 'framing', coverage_value: 8, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 6inch x 10ft', calculation_type: 'framing', coverage_value: 10, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 6inch x 12ft', calculation_type: 'framing', coverage_value: 12, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 8inch x 8ft', calculation_type: 'framing', coverage_value: 8, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 8inch x 10ft', calculation_type: 'framing', coverage_value: 10, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 8inch x 12ft', calculation_type: 'framing', coverage_value: 12, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 10inch x 8ft', calculation_type: 'framing', coverage_value: 8, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 10inch x 12ft', calculation_type: 'framing', coverage_value: 12, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 10inch x 10ft', calculation_type: 'framing', coverage_value: 10, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 12inch x 8ft', calculation_type: 'framing', coverage_value: 8, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 12inch x 12ft', calculation_type: 'framing', coverage_value: 12, unit_type: 'piece', unit_price: 0 },
      { name: '2inch x 12inch x 10ft', calculation_type: 'framing', coverage_value: 10, unit_type: 'piece', unit_price: 0 }
    ]
  }
];

async function insertTree(nodes, parentId = null) {
  for (const node of nodes) {
    const res = await pool.query(
      `INSERT INTO quote_materials (parent_id, name, calculation_type, coverage_value, unit_price, unit_type) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [parentId, node.name, node.calculation_type || 'direct', node.coverage_value || null, node.unit_price || null, node.unit_type || null]
    );
    const newId = res.rows[0].id;
    if (node.children) {
      await insertTree(node.children, newId);
    }
  }
}

async function runSeed() {
  console.log('🌱 Starting Quotation Database setup...\n');

  try {
    // 1. Run Schema
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'quote_schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('✅ Base quotation schema created (quotes, quote_materials, quote_line_items).');

    // 2. Clear existing materials (for development safety)
    await pool.query('DELETE FROM quote_materials;');
    console.log('✅ Cleared existing materials.');

    // 3. Insert hierarchical data
    await insertTree(MATERIAL_TREE);
    console.log('✅ Successfully seeded custom Sheet and Wood hierarchy with area and linear metrics!');

    process.exit(0);
  } catch (err) {
    console.error('❌ Quotation Seed failed:', err);
    process.exit(1);
  }
}

runSeed();
