import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

function loadEnvFile(path) {
  try {
    const content = readFileSync(path, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex === -1) continue
      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // Ignore missing env files.
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and a Supabase key.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const testimonials = [
  {
    name: 'Anjali Desai',
    program: 'Bachelor of Arts',
    company: 'Content Strategist at Tech Corp',
    testimonial:
      'My time at SNDT shaped me into an independent professional. The faculty and resources provided exceptional learning opportunities.',
    sort_order: 1,
  },
  {
    name: 'Priya Sharma',
    program: 'PhD in Computer Science',
    company: 'Senior Researcher at Microsoft',
    testimonial:
      'SNDT has given me the confidence and knowledge to contribute to cutting-edge technology. The mentorship was truly transformative.',
    sort_order: 2,
  },
  {
    name: 'Neha Patel',
    program: 'MBA',
    company: 'Founder & CEO',
    testimonial:
      'SNDT gave me the network and skills I needed to launch my startup. The supportive community was instrumental.',
    sort_order: 3,
  },
  {
    name: 'Dr. Sneha Gupta',
    program: 'Master of Science',
    company: 'Doctor & Social Activist',
    testimonial:
      'The holistic education at SNDT instilled values of social responsibility and empathy alongside professional skills.',
    sort_order: 4,
  },
  {
    name: 'Kavya Reddy',
    program: 'Master of Science',
    company: 'Research Scientist at IIT',
    testimonial:
      'The research opportunities here were invaluable. SNDT provides the perfect environment for intellectual growth and innovation.',
    sort_order: 5,
  },
  {
    name: 'Vidya Iyer',
    program: 'Bachelor of Commerce',
    company: 'Financial Analyst at Goldman Sachs',
    testimonial:
      'SNDT equipped me with analytical and leadership skills that have been invaluable in my finance career.',
    sort_order: 6,
  },
]

async function tableExists() {
  const { error } = await supabase.from('testimonials').select('id').limit(1)
  return !error
}

async function seedTestimonials() {
  const { count, error: countError } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact', head: true })

  if (countError) throw countError
  if (count && count > 0) {
    console.log(`Testimonials table already has ${count} row(s). Skipping seed.`)
    return
  }

  const { error } = await supabase.from('testimonials').insert(testimonials)
  if (error) throw error
  console.log(`Seeded ${testimonials.length} testimonials.`)
}

async function runSqlWithPg(sql) {
  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL
  if (!databaseUrl) return false

  let pg
  try {
    pg = await import('pg')
  } catch {
    console.error('Install pg to run SQL locally: npm install pg')
    return false
  }

  const client = new pg.default.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()
  try {
    await client.query(sql)
    return true
  } finally {
    await client.end()
  }
}

async function main() {
  console.log('Setting up testimonials table...')

  const sql = readFileSync(new URL('./09-setup-testimonials.sql', import.meta.url), 'utf8')

  if (await runSqlWithPg(sql)) {
    console.log('Applied testimonials SQL via DATABASE_URL.')
    return
  }

  const rpcNames = ['execute_sql', 'exec']

  for (const rpcName of rpcNames) {
    const { error } = await supabase.rpc(rpcName, { sql })
    if (!error) {
      console.log(`Applied testimonials SQL via ${rpcName}.`)
      return
    }
  }

  if (await tableExists()) {
    await seedTestimonials()
    console.log('Testimonials table is ready.')
    return
  }

  console.error(
    'Could not create testimonials table automatically. Add DATABASE_URL or SUPABASE_SERVICE_ROLE_KEY to .env.local, or run scripts/09-setup-testimonials.sql in the Supabase SQL editor.',
  )
  process.exit(1)
}

main().catch((error) => {
  console.error('Testimonials setup failed:', error.message || error)
  process.exit(1)
})
