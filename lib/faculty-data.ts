export interface FacultyMember {
  id: string
  name: string
  designation: string
  department: string
  degree: string
  specialization: string[]
  email: string
  phone?: string
  office?: string
  image_url: string
  bio: string
  experience: string
  research_interests: string[]
  publications: {
    title: string
    journal: string
    year: number
  }[]
  awards: string[]
  courses_taught: string[]
  status: 'current' | 'former'
  joined_year: number
  left_year?: number
  position_history?: string
}

export const facultyData: FacultyMember[] = [
  // Current Faculty
  {
    id: 'dr-meena-sharma',
    name: 'Dr. Meena Sharma',
    designation: 'Professor & Head of Department',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A., B.A.',
    specialization: ['Microeconomics', 'Development Economics', 'Gender Studies'],
    email: 'meena.sharma@sndt.ac.in',
    phone: '+91 22 2654 3201',
    office: 'Room 301, Main Building',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Meena Sharma is a distinguished economist with over 25 years of experience in teaching and research. She has been instrumental in shaping the economics curriculum at SNDT University and has mentored countless students who have gone on to achieve great success in their careers. Her research focuses on the intersection of gender and economic development in South Asia.',
    experience: '25+ years in academia',
    research_interests: [
      'Women in the Indian Economy',
      'Microfinance and Self-Help Groups',
      'Rural Development',
      'Labor Economics'
    ],
    publications: [
      { title: 'Women and Economic Development in India', journal: 'Economic and Political Weekly', year: 2023 },
      { title: 'Impact of Microfinance on Women Empowerment', journal: 'Indian Journal of Economics', year: 2022 },
      { title: 'Gender Wage Gap: A Study of Urban India', journal: 'Journal of Development Studies', year: 2021 }
    ],
    awards: [
      'Best Researcher Award, SNDT University (2022)',
      'Excellence in Teaching Award (2019)',
      'UGC Research Fellowship (2015-2018)'
    ],
    courses_taught: ['Microeconomics', 'Development Economics', 'Research Methodology', 'Indian Economy'],
    status: 'current',
    joined_year: 1999
  },
  {
    id: 'dr-priya-desai',
    name: 'Dr. Priya Desai',
    designation: 'Associate Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.Phil., M.A.',
    specialization: ['Macroeconomics', 'International Trade', 'Monetary Economics'],
    email: 'priya.desai@sndt.ac.in',
    phone: '+91 22 2654 3202',
    office: 'Room 302, Main Building',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Priya Desai specializes in macroeconomic policy and international trade. With a doctorate from the Delhi School of Economics, she brings rigorous analytical skills to her teaching and research. She has published extensively in peer-reviewed journals and is known for her engaging teaching style.',
    experience: '18 years in academia',
    research_interests: [
      'Trade Policy and Economic Growth',
      'Monetary Policy Transmission',
      'Exchange Rate Dynamics',
      'Fiscal Policy Analysis'
    ],
    publications: [
      { title: 'Trade Liberalization and Economic Growth in India', journal: 'Economic Modelling', year: 2024 },
      { title: 'Monetary Policy Effectiveness in Emerging Economies', journal: 'Journal of Monetary Economics', year: 2023 },
      { title: 'Exchange Rate Pass-Through: Evidence from India', journal: 'International Economic Review', year: 2022 }
    ],
    awards: [
      'Young Economist Award, Indian Economic Association (2018)',
      'Best Paper Award, Annual Conference on Money and Finance (2021)'
    ],
    courses_taught: ['Macroeconomics', 'International Economics', 'Monetary Theory', 'Econometrics'],
    status: 'current',
    joined_year: 2006
  },
  {
    id: 'dr-anita-kulkarni',
    name: 'Dr. Anita Kulkarni',
    designation: 'Associate Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A., B.Com.',
    specialization: ['Public Finance', 'Environmental Economics', 'Health Economics'],
    email: 'anita.kulkarni@sndt.ac.in',
    phone: '+91 22 2654 3203',
    office: 'Room 303, Main Building',
    image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Anita Kulkarni is an expert in public finance and environmental economics. Her research examines the fiscal aspects of environmental policy and healthcare financing in India. She has consulted for various government bodies on policy matters.',
    experience: '15 years in academia',
    research_interests: [
      'Green Taxation',
      'Healthcare Financing',
      'Government Budgeting',
      'Sustainable Development'
    ],
    publications: [
      { title: 'Carbon Taxation: Lessons for India', journal: 'Environmental Economics and Policy Studies', year: 2024 },
      { title: 'Public Health Expenditure and Outcomes in India', journal: 'Health Economics Review', year: 2023 }
    ],
    awards: [
      'Excellence in Research, SNDT University (2023)',
      'Best Faculty Award, Department of Economics (2020)'
    ],
    courses_taught: ['Public Finance', 'Environmental Economics', 'Health Economics', 'Statistics'],
    status: 'current',
    joined_year: 2009
  },
  {
    id: 'dr-kavita-patil',
    name: 'Dr. Kavita Patil',
    designation: 'Assistant Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A.',
    specialization: ['Agricultural Economics', 'Rural Development', 'Food Security'],
    email: 'kavita.patil@sndt.ac.in',
    phone: '+91 22 2654 3204',
    office: 'Room 304, Main Building',
    image_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Kavita Patil focuses on agricultural economics and rural development. Her field research in Maharashtra villages has contributed significantly to understanding agrarian distress and potential solutions. She is passionate about bridging the gap between academic research and policy implementation.',
    experience: '10 years in academia',
    research_interests: [
      'Agricultural Policy',
      'Farm Income and Livelihood',
      'Food Supply Chains',
      'Climate Change and Agriculture'
    ],
    publications: [
      { title: 'Agrarian Crisis in Maharashtra: Causes and Solutions', journal: 'Indian Journal of Agricultural Economics', year: 2024 },
      { title: 'Food Security and Public Distribution System', journal: 'Economic and Political Weekly', year: 2023 }
    ],
    awards: [
      'Young Faculty Research Grant, ICSSR (2022)',
      'Best Dissertation Award, University of Pune (2014)'
    ],
    courses_taught: ['Agricultural Economics', 'Rural Development', 'Indian Economy', 'Development Planning'],
    status: 'current',
    joined_year: 2014
  },
  {
    id: 'dr-sunita-joshi',
    name: 'Dr. Sunita Joshi',
    designation: 'Assistant Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A., NET',
    specialization: ['Behavioral Economics', 'Financial Economics', 'Consumer Behavior'],
    email: 'sunita.joshi@sndt.ac.in',
    phone: '+91 22 2654 3205',
    office: 'Room 305, Main Building',
    image_url: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Sunita Joshi brings a fresh perspective to the department with her expertise in behavioral economics. She completed her Ph.D. from IIT Bombay and has worked on projects examining financial decision-making among Indian households.',
    experience: '7 years in academia',
    research_interests: [
      'Behavioral Finance',
      'Financial Literacy',
      'Consumer Decision Making',
      'Experimental Economics'
    ],
    publications: [
      { title: 'Financial Literacy and Investment Decisions', journal: 'Journal of Behavioral Finance', year: 2024 },
      { title: 'Nudging Savings Behavior: A Field Experiment', journal: 'Behavioral Economics', year: 2023 }
    ],
    awards: [
      'Young Economist Fellowship, Reserve Bank of India (2021)',
      'Best Paper Award, Behavioral Economics Conference (2023)'
    ],
    courses_taught: ['Behavioral Economics', 'Financial Economics', 'Mathematical Economics', 'Game Theory'],
    status: 'current',
    joined_year: 2017
  },
  {
    id: 'prof-rekha-nair',
    name: 'Prof. Rekha Nair',
    designation: 'Assistant Professor',
    department: 'Economics',
    degree: 'M.Phil., M.A., NET',
    specialization: ['Indian Economic History', 'Political Economy', 'Economic Thought'],
    email: 'rekha.nair@sndt.ac.in',
    phone: '+91 22 2654 3206',
    office: 'Room 306, Main Building',
    image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face',
    bio: 'Prof. Rekha Nair specializes in Indian economic history and the history of economic thought. Her classes on colonial economic history are particularly popular among students. She is currently pursuing her Ph.D. on economic policies during the freedom movement.',
    experience: '5 years in academia',
    research_interests: [
      'Colonial Economic History',
      'History of Economic Thought',
      'Political Economy of India',
      'Economic Nationalism'
    ],
    publications: [
      { title: 'Economic Ideas of Indian Nationalists', journal: 'Indian Economic and Social History Review', year: 2023 }
    ],
    awards: [
      'Best Teacher Award, Student Council (2024)'
    ],
    courses_taught: ['Economic History of India', 'History of Economic Thought', 'Political Economy', 'Principles of Economics'],
    status: 'current',
    joined_year: 2019
  },
  // Former Faculty
  {
    id: 'dr-kamala-devi',
    name: 'Dr. Kamala Devi',
    designation: 'Professor Emeritus',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A., D.Litt.',
    specialization: ['Development Economics', 'Indian Planning', 'Women and Development'],
    email: 'kamala.devi@sndt.ac.in',
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Kamala Devi served the department for over 35 years and was instrumental in establishing the M.A. Economics program at SNDT University. Her pioneering work on women in the Indian economy has been cited extensively. She continues to guide doctoral students and deliver guest lectures.',
    experience: '35+ years in academia',
    research_interests: [
      'Indian Five Year Plans',
      'Women and Economic Development',
      'Poverty Alleviation Programs',
      'Economic Planning'
    ],
    publications: [
      { title: 'Women in Indian Economy: A Historical Perspective', journal: 'Indian Economic Review', year: 2018 },
      { title: 'Five Decades of Indian Planning', journal: 'Economic and Political Weekly', year: 2015 },
      { title: 'Poverty Alleviation: Success and Failures', journal: 'Journal of Development Studies', year: 2012 }
    ],
    awards: [
      'Lifetime Achievement Award, Indian Economic Association (2020)',
      'Padma Shri (Nominated) for contribution to Economics Education (2019)',
      'Best Researcher Award, University Grants Commission (2010)'
    ],
    courses_taught: ['Development Economics', 'Indian Planning', 'Poverty and Inequality', 'Research Methodology'],
    status: 'former',
    joined_year: 1985,
    left_year: 2020,
    position_history: 'Professor & Head (2008-2020), Associate Professor (1998-2008), Assistant Professor (1985-1998)'
  },
  {
    id: 'dr-lakshmi-iyer',
    name: 'Dr. Lakshmi Iyer',
    designation: 'Former Associate Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A.',
    specialization: ['International Economics', 'Trade Policy', 'WTO Studies'],
    email: 'lakshmi.iyer@gmail.com',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Lakshmi Iyer was a valued member of our faculty from 2005 to 2022. She specialized in international trade and was known for her expertise in WTO agreements. She has since joined a leading policy think tank in Delhi where she continues her research.',
    experience: '17 years at SNDT',
    research_interests: [
      'WTO and Developing Countries',
      'Trade Agreements',
      'Export Competitiveness',
      'Global Value Chains'
    ],
    publications: [
      { title: 'India and WTO: Two Decades of Membership', journal: 'World Trade Review', year: 2020 },
      { title: 'Trade Liberalization and Indian Manufacturing', journal: 'Journal of International Trade', year: 2018 }
    ],
    awards: [
      'Excellence in Teaching Award (2015)',
      'Best Faculty Award (2012)'
    ],
    courses_taught: ['International Trade', 'WTO Studies', 'Export Management', 'Global Economics'],
    status: 'former',
    joined_year: 2005,
    left_year: 2022,
    position_history: 'Associate Professor (2012-2022), Assistant Professor (2005-2012)'
  },
  {
    id: 'prof-vasudha-patel',
    name: 'Prof. Vasudha Patel',
    designation: 'Former Assistant Professor',
    department: 'Economics',
    degree: 'M.Phil., M.A., NET',
    specialization: ['Labor Economics', 'Industrial Relations', 'Social Security'],
    email: 'vasudha.patel@outlook.com',
    image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    bio: 'Prof. Vasudha Patel taught labor economics at SNDT from 2010 to 2023. Her classes on labor laws and industrial relations were highly appreciated. She retired in 2023 and now volunteers with labor rights organizations.',
    experience: '13 years at SNDT',
    research_interests: [
      'Labor Laws in India',
      'Informal Sector Employment',
      'Social Security Systems',
      'Trade Unions'
    ],
    publications: [
      { title: 'Informal Workers and Social Security', journal: 'Indian Journal of Labour Economics', year: 2021 },
      { title: 'Gig Economy and Labor Rights', journal: 'Economic Weekly', year: 2020 }
    ],
    awards: [
      'Dedicated Service Award (2023)',
      'Best Faculty, Student Council (2018)'
    ],
    courses_taught: ['Labor Economics', 'Industrial Economics', 'Social Security', 'Human Resource Economics'],
    status: 'former',
    joined_year: 2010,
    left_year: 2023,
    position_history: 'Assistant Professor (2010-2023)'
  },
  {
    id: 'dr-shanti-menon',
    name: 'Dr. Shanti Menon',
    designation: 'Former Professor',
    department: 'Economics',
    degree: 'Ph.D. in Economics, M.A., B.A. (Hons)',
    specialization: ['Econometrics', 'Quantitative Methods', 'Applied Statistics'],
    email: 'shanti.menon@yahoo.com',
    image_url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
    bio: 'Dr. Shanti Menon was the founding coordinator of the M.A. Econometrics specialization at SNDT. Her rigorous approach to teaching quantitative methods prepared generations of students for careers in research and analytics. She retired in 2019 after 30 years of dedicated service.',
    experience: '30 years at SNDT',
    research_interests: [
      'Time Series Analysis',
      'Panel Data Methods',
      'Applied Econometrics',
      'Statistical Methods'
    ],
    publications: [
      { title: 'Introduction to Econometrics (Textbook)', journal: 'Oxford University Press', year: 2015 },
      { title: 'Time Series Analysis of Indian Stock Markets', journal: 'Journal of Quantitative Economics', year: 2017 }
    ],
    awards: [
      'Lifetime Achievement Award, SNDT University (2019)',
      'Best Teacher Award (Multiple Years)',
      'Outstanding Research Award, Indian Econometric Society (2010)'
    ],
    courses_taught: ['Econometrics', 'Statistics for Economists', 'Mathematical Economics', 'Research Methods'],
    status: 'former',
    joined_year: 1989,
    left_year: 2019,
    position_history: 'Professor (2005-2019), Associate Professor (1999-2005), Assistant Professor (1989-1999)'
  }
]

export function getCurrentFaculty(): FacultyMember[] {
  return facultyData.filter(f => f.status === 'current').sort((a, b) => a.joined_year - b.joined_year)
}

export function getFormerFaculty(): FacultyMember[] {
  return facultyData.filter(f => f.status === 'former').sort((a, b) => (b.left_year || 0) - (a.left_year || 0))
}

export function getFacultyById(id: string): FacultyMember | undefined {
  return facultyData.find(f => f.id === id)
}
