-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  achievement TEXT NOT NULL,
  description TEXT,
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image TEXT,
  bio TEXT NOT NULL,
  email TEXT,
  department TEXT,
  expertise TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS on achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Enable RLS on faculty
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read on achievements
CREATE POLICY "Allow public read achievements" ON achievements
  FOR SELECT USING (true);

-- Create policy to allow public read on faculty
CREATE POLICY "Allow public read faculty" ON faculty
  FOR SELECT USING (true);
