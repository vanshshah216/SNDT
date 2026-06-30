-- Seed SNDT University Data

-- Insert Programs
INSERT INTO public.programs (name, description, duration, year) VALUES
('Bachelor of Arts', 'Comprehensive 3-year arts program', '3 years', 1),
('Bachelor of Science', 'Science curriculum with practical training', '3 years', 1),
('Master of Arts', 'Advanced postgraduate studies', '2 years', 1),
('M.Tech & M.E.', 'Engineering specializations', '2 years', 1),
('Certificate Programs', 'Specialized skill development', '1 year', 1);

-- Insert Syllabi for Bachelor of Arts
WITH ba AS (SELECT id FROM public.programs WHERE name = 'Bachelor of Arts')
INSERT INTO public.syllabi (program_id, course_name, course_code, credits, year, semester, description) VALUES
((SELECT id FROM ba), 'English Literature', 'BA-101', 4, 1, 1, 'Study of classical and contemporary literature'),
((SELECT id FROM ba), 'History Studies', 'BA-102', 4, 1, 1, 'History of India and world civilizations'),
((SELECT id FROM ba), 'Philosophy', 'BA-103', 4, 1, 2, 'Introduction to philosophical thought'),
((SELECT id FROM ba), 'Economics', 'BA-104', 4, 1, 2, 'Principles of economics and development'),
((SELECT id FROM ba), 'Political Science', 'BA-105', 4, 2, 1, 'Indian politics and governance'),
((SELECT id FROM ba), 'Sociology', 'BA-106', 4, 2, 1, 'Society and social structures');

-- Insert Library Resources
INSERT INTO public.library_resources (title, author, category, resource_type, description, year_published) VALUES
('Introduction to Computer Science', 'Donald Knuth', 'Technology', 'book', 'Foundational concepts in computer science', 2020),
('Advanced Mathematics for Engineers', 'Prof. Harish Kumar', 'Engineering', 'book', 'Complex analysis and applications', 2019),
('Women in Indian History', 'Dr. Ramachandra Guha', 'History', 'research_paper', 'Academic study of women''s roles in Indian history', 2021),
('Global Sustainability Research', 'International Team', 'Environmental Science', 'journal', 'Latest research on sustainable development', 2022),
('Quantum Physics Today', 'Dr. Priya Sharma', 'Physics', 'thesis', 'PhD research on quantum mechanics applications', 2023);

-- Insert Faculty
INSERT INTO public.faculty (name, title, department, specialization, bio, email, research_interests, publications) VALUES
('Dr. Meera Deshmukh', 'Professor', 'English & Literature', 'Contemporary Literature', 'Renowned scholar with 25+ years of teaching experience', 'meera.deshmukh@sndt.edu', ARRAY['Modern Literature', 'Women Writers', 'Cultural Studies'], 45),
('Dr. Rajesh Sharma', 'Associate Professor', 'History', 'Modern Indian History', 'Specialist in 20th century Indian history', 'rajesh.sharma@sndt.edu', ARRAY['Indian Independence', 'Social Movements'], 32),
('Dr. Sunita Nair', 'Professor', 'Physics', 'Quantum Mechanics', 'Leading researcher in theoretical physics', 'sunita.nair@sndt.edu', ARRAY['Quantum Theory', 'Particle Physics'], 67),
('Dr. Ananya Kulkarni', 'Assistant Professor', 'Computer Science', 'Artificial Intelligence', 'AI and machine learning expert', 'ananya.kulkarni@sndt.edu', ARRAY['Machine Learning', 'Neural Networks'], 28);

-- Insert Departments
INSERT INTO public.departments (name, description, faculty_count, research_areas, papers_published) VALUES
('Computer Science & IT', 'State-of-the-art technology education and research', 12, ARRAY['AI', 'Machine Learning', 'Cloud Computing'], 156),
('Engineering', 'Civil, Mechanical, and Electrical Engineering programs', 18, ARRAY['Structural Analysis', 'Renewable Energy'], 203),
('Arts & Humanities', 'Literature, History, Philosophy and Social Sciences', 15, ARRAY['Indian Literature', 'Social Studies'], 89),
('Sciences', 'Physics, Chemistry, Biology and Mathematics', 20, ARRAY['Quantum Physics', 'Organic Chemistry'], 267);

-- Insert Student Stories
INSERT INTO public.student_stories (title, student_name, program, story, image_url) VALUES
('From Dreams to Reality', 'Priya Singh', 'Bachelor of Arts', 'SNDT empowered me to pursue my passion for literature and led me to publish my first book. The faculty support was instrumental in my success.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop'),
('Breaking Barriers in Tech', 'Deepika Verma', 'Bachelor of Science', 'As a first-generation learner, SNDT provided the perfect environment to excel in STEM fields. Today I work at a leading tech company.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'),
('Research Excellence', 'Anjali Patel', 'Master of Arts', 'My research at SNDT has been published in international journals. The university''s mentorship shaped my academic journey.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop'),
('Global Perspective', 'Sakshi Raghavan', 'Bachelor of Arts', 'SNDT''s exchange programs gave me exposure to global perspectives while keeping me rooted in Indian values and traditions.', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop');

-- Insert Featured Events
INSERT INTO public.events (title, description, category, event_date, end_date, location, is_featured, organizer) VALUES
('Annual Cultural Festival - Abhigyaan 2024', 'Celebrate the vibrant culture with workshops, performances, and exhibitions', 'Cultural', '2024-03-15 08:00:00+05:30', '2024-03-17 18:00:00+05:30', 'SNDT Campus', true, 'Student Council'),
('AI & Machine Learning Workshop', 'Hands-on workshop exploring cutting-edge AI applications', 'Workshop', '2024-02-25 10:00:00+05:30', '2024-02-25 17:00:00+05:30', 'Computer Science Block', true, 'CS Department'),
('Women in Leadership Summit', 'Conference featuring renowned women leaders and entrepreneurs', 'Academic', '2024-04-10 09:00:00+05:30', '2024-04-10 17:00:00+05:30', 'Auditorium', true, 'Women''s Cell'),
('Research Paper Presentation', 'Faculty and student research presentations', 'Academic', '2024-03-05 10:00:00+05:30', '2024-03-05 16:00:00+05:30', 'Seminar Hall', false, 'Research Office'),
('Sports Week', 'Inter-class sports competitions and exhibitions', 'Sports', '2024-05-01 08:00:00+05:30', '2024-05-07 18:00:00+05:30', 'Sports Complex', false, 'Sports Committee');
