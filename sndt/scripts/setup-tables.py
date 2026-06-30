import os
import sys
from supabase import create_client

# Get environment variables
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not supabase_url or not supabase_key:
    print("Error: Missing Supabase environment variables")
    sys.exit(1)

# Create Supabase client
supabase = create_client(supabase_url, supabase_key)

# Create achievements table
try:
    supabase.query("""
        CREATE TABLE IF NOT EXISTS public.achievements (
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
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    """)
    print("✓ Achievements table created successfully")
except Exception as e:
    print(f"Achievements table: {str(e)}")

# Create faculty table
try:
    supabase.query("""
        CREATE TABLE IF NOT EXISTS public.faculty (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            image TEXT,
            bio TEXT NOT NULL,
            email TEXT,
            department TEXT,
            expertise TEXT[] DEFAULT ARRAY[]::TEXT[],
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    """)
    print("✓ Faculty table created successfully")
except Exception as e:
    print(f"Faculty table: {str(e)}")

print("All tables created!")
