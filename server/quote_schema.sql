-- Quotation Engine Database Schema

-- Adjacency List for Materials (Infinite Nesting)
CREATE TABLE IF NOT EXISTS quote_materials (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER REFERENCES quote_materials(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  
  -- Calculation Engine Fields
  calculation_type VARCHAR(50) DEFAULT 'direct', -- 'direct', 'area', 'linear'
  coverage_value DECIMAL(10,2), -- e.g., 32 (for a 4x8 drywall)
  
  -- Pricing Fields
  unit_price DECIMAL(10,2), -- Null if it's just a folder category
  unit_type VARCHAR(50), -- e.g., 'sheet', 'board', 'sqft'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quote_materials_parent_id ON quote_materials(parent_id);

-- Quotes Master Table
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255),
  client_phone VARCHAR(50),
  project_address TEXT,
  project_type VARCHAR(255),
  status VARCHAR(50) DEFAULT 'draft',
  grand_total DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quote Line Items
CREATE TABLE IF NOT EXISTS quote_line_items (
  id SERIAL PRIMARY KEY,
  quote_id INTEGER REFERENCES quotes(id) ON DELETE CASCADE,
  material_id INTEGER REFERENCES quote_materials(id) ON DELETE SET NULL,
  
  -- Manual Overrides (in case they change the name on the fly)
  override_name VARCHAR(255),
  
  -- Calculation Inputs
  input_length DECIMAL(10,2),
  input_width DECIMAL(10,2),
  input_quantity DECIMAL(10,2),
  
  -- Final Computed Values
  calculated_quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quote_line_items_quote_id ON quote_line_items(quote_id);
