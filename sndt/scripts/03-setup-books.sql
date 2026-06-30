-- Create books table with 1000+ sample books
CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  publication_year INTEGER,
  edition TEXT,
  pages INTEGER,
  availability_status TEXT DEFAULT 'available', -- available, checked_out, reserved
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  video_url TEXT,
  agenda JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create public read-only policies
CREATE POLICY "books_select_public" ON public.books FOR SELECT USING (true);
CREATE POLICY "events_select_public" ON public.events FOR SELECT USING (true);

-- Insert sample books data (1000+ books)
INSERT INTO public.books (title, author, isbn, category, description, cover_image_url, publication_year, edition, pages, availability_status) VALUES
('Introduction to Computer Science', 'Dr. Alan Turing', 'ISBN-001', 'Technology', 'A comprehensive guide to computer science fundamentals', 'https://via.placeholder.com/150x225?text=Computer+Science', 2023, '1st', 400, 'available'),
('Advanced Mathematics for Engineers', 'Prof. Leonhard Euler', 'ISBN-002', 'Mathematics', 'Mathematical concepts for engineering applications', 'https://via.placeholder.com/150x225?text=Mathematics', 2024, '2nd', 500, 'available'),
('Women in Indian History', 'Dr. Sharma', 'ISBN-003', 'History', 'Comprehensive study of women''s contributions to Indian history', 'https://via.placeholder.com/150x225?text=Indian+History', 2023, '1st', 350, 'available'),
('Quantum Physics Fundamentals', 'Prof. Albert Einstein', 'ISBN-004', 'Physics', 'Understanding quantum mechanics and its applications', 'https://via.placeholder.com/150x225?text=Quantum+Physics', 2022, '3rd', 450, 'available'),
('Organic Chemistry Synthesis', 'Dr. Linus Pauling', 'ISBN-005', 'Chemistry', 'Detailed guide on organic synthesis techniques', 'https://via.placeholder.com/150x225?text=Chemistry', 2024, '1st', 380, 'available'),
('Data Science and AI', 'Prof. Andrew Ng', 'ISBN-006', 'Technology', 'Machine learning and artificial intelligence concepts', 'https://via.placeholder.com/150x225?text=Data+Science', 2023, '2nd', 420, 'available'),
('Modern Biology', 'Dr. Richard Dawkins', 'ISBN-007', 'Biology', 'Contemporary perspectives in biological sciences', 'https://via.placeholder.com/150x225?text=Biology', 2022, '1st', 390, 'available'),
('Environmental Science', 'Prof. Rachel Carson', 'ISBN-008', 'Environmental Studies', 'Exploring ecological systems and conservation', 'https://via.placeholder.com/150x225?text=Environment', 2024, '2nd', 410, 'available'),
('Philosophy of Mind', 'Dr. David Chalmers', 'ISBN-009', 'Philosophy', 'Consciousness and cognitive science', 'https://via.placeholder.com/150x225?text=Philosophy', 2023, '1st', 360, 'available'),
('Economic Theory', 'Prof. Paul Samuelson', 'ISBN-010', 'Economics', 'Macroeconomic and microeconomic principles', 'https://via.placeholder.com/150x225?text=Economics', 2024, '4th', 480, 'available');

-- Insert more books to reach 1000+ (repeating with variations)
-- This creates unique entries by varying the book details
INSERT INTO public.books (title, author, isbn, category, description, cover_image_url, publication_year, edition, pages, availability_status)
SELECT 
  'Advanced ' || array_element || ' ' || num::text,
  'Prof. ' || array_element,
  'ISBN-' || LPAD(num::text, 4, '0'),
  CASE (num % 5)
    WHEN 0 THEN 'Technology'
    WHEN 1 THEN 'Science'
    WHEN 2 THEN 'History'
    WHEN 3 THEN 'Literature'
    ELSE 'Arts'
  END,
  'Comprehensive guide on ' || array_element || ' for students and professionals',
  'https://via.placeholder.com/150x225?text=' || array_element,
  2020 + (num % 5),
  '1st',
  300 + (num % 200),
  'available'
FROM (
  SELECT * FROM (VALUES ('Computing'), ('Mathematics'), ('Biology'), ('Chemistry'), ('Physics')) AS t(array_element)
  CROSS JOIN LATERAL (
    SELECT generate_series(11, 1000) AS num
  ) sub
) expanded;
