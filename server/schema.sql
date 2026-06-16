-- XeusHome Database Schema

-- Admin users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  category VARCHAR(100),
  meta_description VARCHAR(160),
  description TEXT,
  cover_image VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  completed_date VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project images table
CREATE TABLE IF NOT EXISTS project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Row-Level Security (RLS)
-- Wrapped in DO blocks so re-running on server restart is safe.
-- ============================================================

-- users: completely locked down (service_role only via server)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- projects: public read, no public write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public can read projects'
  ) THEN
    CREATE POLICY "Public can read projects"
      ON projects FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

-- project_images: public read, no public write
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'project_images' AND policyname = 'Public can read project images'
  ) THEN
    CREATE POLICY "Public can read project images"
      ON project_images FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

-- messages: public insert only (contact form), no public read
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Public can submit contact messages'
  ) THEN
    CREATE POLICY "Public can submit contact messages"
      ON messages FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;
