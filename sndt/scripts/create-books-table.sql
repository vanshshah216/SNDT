-- Create books table for library management
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT,
  category TEXT,
  description TEXT,
  thumbnail_url TEXT,
  pdf_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_books_title ON books USING BTREE (title);
CREATE INDEX IF NOT EXISTS idx_books_category ON books USING BTREE (category);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow public read access
CREATE POLICY "Allow public read access" ON books
  FOR SELECT
  USING (true);

-- Create RLS policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON books
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON books
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON books
  FOR DELETE
  USING (auth.role() = 'authenticated');
