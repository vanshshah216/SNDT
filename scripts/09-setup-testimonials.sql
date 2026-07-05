-- Create testimonials table for About page
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  program TEXT NOT NULL,
  company TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON public.testimonials (sort_order);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_select_public" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_insert_admin" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_update_admin" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_delete_admin" ON public.testimonials;

CREATE POLICY "testimonials_select_public"
  ON public.testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "testimonials_insert_admin"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "testimonials_update_admin"
  ON public.testimonials
  FOR UPDATE
  USING (true);

CREATE POLICY "testimonials_delete_admin"
  ON public.testimonials
  FOR DELETE
  USING (true);

INSERT INTO public.testimonials (name, program, company, testimonial, sort_order)
VALUES
  (
    'Anjali Desai',
    'Bachelor of Arts',
    'Content Strategist at Tech Corp',
    'My time at SNDT shaped me into an independent professional. The faculty and resources provided exceptional learning opportunities.',
    1
  ),
  (
    'Priya Sharma',
    'PhD in Computer Science',
    'Senior Researcher at Microsoft',
    'SNDT has given me the confidence and knowledge to contribute to cutting-edge technology. The mentorship was truly transformative.',
    2
  ),
  (
    'Neha Patel',
    'MBA',
    'Founder & CEO',
    'SNDT gave me the network and skills I needed to launch my startup. The supportive community was instrumental.',
    3
  ),
  (
    'Dr. Sneha Gupta',
    'Master of Science',
    'Doctor & Social Activist',
    'The holistic education at SNDT instilled values of social responsibility and empathy alongside professional skills.',
    4
  ),
  (
    'Kavya Reddy',
    'Master of Science',
    'Research Scientist at IIT',
    'The research opportunities here were invaluable. SNDT provides the perfect environment for intellectual growth and innovation.',
    5
  ),
  (
    'Vidya Iyer',
    'Bachelor of Commerce',
    'Financial Analyst at Goldman Sachs',
    'SNDT equipped me with analytical and leadership skills that have been invaluable in my finance career.',
    6
  );
