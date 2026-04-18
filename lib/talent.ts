// =============================================================================
// Talent registry — seed data for Helios.
// A curated roster of practitioners across engineering, design, and product.
// =============================================================================

export type Discipline =
  | "ai-ml"
  | "backend"
  | "frontend"
  | "full-stack"
  | "design"
  | "product"
  | "data"
  | "platform"
  | "mobile"
  | "research"

export type Level = "junior" | "mid" | "senior" | "staff" | "principal"
export type Availability = "active" | "open" | "passive"
export type WorkMode = "remote" | "hybrid" | "onsite"

export interface Experience {
  company: string
  role: string
  period: string
  description: string
}

export interface EducationEntry {
  school: string
  degree: string
  period: string
}

export interface SelectedWork {
  title: string
  summary: string
  href?: string
}

export interface Candidate {
  slug: string
  name: string
  title: string
  headline: string
  discipline: Discipline
  level: Level
  location: string
  region: "Americas" | "EMEA" | "APAC"
  timezone: string
  workMode: WorkMode
  availability: Availability
  years: number
  compensation: { min: number; max: number; currency: "USD" | "EUR" | "GBP" }
  skills: string[]
  languages: string[]
  bio: string
  experience: Experience[]
  education: EducationEntry[]
  selectedWork: SelectedWork[]
  links: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
  }
  featured?: boolean
  lastActiveDays: number
}

// ----- Display metadata -----------------------------------------------------

export const DISCIPLINES: Record<
  Discipline,
  { label: string; short: string; description: string }
> = {
  "ai-ml": {
    label: "AI & Machine Learning",
    short: "AI / ML",
    description:
      "Foundation models, retrieval systems, evaluation harnesses, applied research.",
  },
  backend: {
    label: "Backend Engineering",
    short: "Backend",
    description:
      "Distributed systems, APIs, data pipelines, observability, storage.",
  },
  frontend: {
    label: "Frontend Engineering",
    short: "Frontend",
    description:
      "Interfaces, performance, accessibility, animation, design systems.",
  },
  "full-stack": {
    label: "Full-Stack Engineering",
    short: "Full-stack",
    description:
      "End-to-end product engineering across the client, server, and data layer.",
  },
  design: {
    label: "Product & Brand Design",
    short: "Design",
    description:
      "Interface, interaction, identity, typography, systems thinking.",
  },
  product: {
    label: "Product Management",
    short: "Product",
    description:
      "Roadmap, research, strategy, measurement, cross-functional leadership.",
  },
  data: {
    label: "Data & Analytics",
    short: "Data",
    description:
      "Analytics engineering, statistics, experimentation, decision science.",
  },
  platform: {
    label: "Platform & DevOps",
    short: "Platform",
    description:
      "Cloud infrastructure, reliability, developer experience, security.",
  },
  mobile: {
    label: "Mobile Engineering",
    short: "Mobile",
    description: "Native iOS and Android, cross-platform, edge performance.",
  },
  research: {
    label: "Applied Research",
    short: "Research",
    description:
      "Paper-to-product translation, experimental prototypes, theoretical grounding.",
  },
}

export const LEVELS: Record<Level, { label: string; yearsRange: string }> = {
  junior: { label: "Junior", yearsRange: "0–2 yrs" },
  mid: { label: "Mid-level", yearsRange: "2–5 yrs" },
  senior: { label: "Senior", yearsRange: "5–8 yrs" },
  staff: { label: "Staff", yearsRange: "8–12 yrs" },
  principal: { label: "Principal", yearsRange: "12+ yrs" },
}

export const AVAILABILITY: Record<
  Availability,
  { label: string; description: string; dotClass: string }
> = {
  active: {
    label: "Actively looking",
    description: "Ready to move within the next 30 days.",
    dotClass: "bg-[color:var(--color-accent)]",
  },
  open: {
    label: "Open to conversations",
    description: "Will consider exceptional opportunities.",
    dotClass: "bg-[#7fa0c4]",
  },
  passive: {
    label: "Not looking",
    description: "Listed for reference only.",
    dotClass: "bg-[color:var(--color-muted-foreground)]",
  },
}

export const WORK_MODES: Record<WorkMode, { label: string }> = {
  remote: { label: "Remote" },
  hybrid: { label: "Hybrid" },
  onsite: { label: "On-site" },
}

export const REGIONS = ["Americas", "EMEA", "APAC"] as const

// ----- The roster -----------------------------------------------------------

export const CANDIDATES: Candidate[] = [
  {
    slug: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    title: "Principal AI Research Engineer",
    headline:
      "Translates frontier LLM research into production systems that reason reliably.",
    discipline: "ai-ml",
    level: "principal",
    location: "London, United Kingdom",
    region: "EMEA",
    timezone: "UTC+0",
    workMode: "hybrid",
    availability: "open",
    years: 14,
    compensation: { min: 280, max: 360, currency: "GBP" },
    skills: [
      "PyTorch",
      "JAX",
      "Retrieval-Augmented Generation",
      "Distributed training",
      "Evaluation harnesses",
      "LoRA / PEFT",
      "vLLM",
      "CUDA",
    ],
    languages: ["English", "Hindi"],
    bio: "Fourteen years at the seam between applied research and engineering. Previously led the foundation-model evaluation group at a frontier lab; currently advising on retrieval architectures and safety-aligned inference. Published in NeurIPS and ACL, with a practitioner's suspicion of benchmarks.",
    experience: [
      {
        company: "Anthropic",
        role: "Research Engineer II",
        period: "2021 — 2024",
        description:
          "Led evaluation tooling for long-context reasoning; authored internal playbooks for reliable inference under distribution shift.",
      },
      {
        company: "DeepMind",
        role: "Research Engineer",
        period: "2016 — 2021",
        description:
          "Worked on language modeling with structured supervision; contributor to open-source evaluation benchmarks.",
      },
      {
        company: "Imperial College London",
        role: "Postdoctoral Researcher",
        period: "2013 — 2016",
        description:
          "Probabilistic programming and Bayesian deep learning under Prof. Y. Gal.",
      },
    ],
    education: [
      {
        school: "University of Cambridge",
        degree: "PhD, Machine Learning",
        period: "2009 — 2013",
      },
      {
        school: "IIT Bombay",
        degree: "B.Tech, Computer Science",
        period: "2005 — 2009",
      },
    ],
    selectedWork: [
      {
        title: "Evalharness — reliable LLM evaluation",
        summary:
          "An open framework for running reproducible evaluations against private model endpoints.",
      },
      {
        title: "Long-context retrieval survey",
        summary:
          "Peer-reviewed survey of retrieval strategies for 100k+ token contexts, cited 300+ times.",
      },
    ],
    links: {
      website: "https://example.com/arjun",
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    featured: true,
    lastActiveDays: 2,
  },
  {
    slug: "maren-holmqvist",
    name: "Maren Holmqvist",
    title: "Senior ML Engineer",
    headline:
      "Builds resilient training pipelines and owns models from notebook to production.",
    discipline: "ai-ml",
    level: "senior",
    location: "Stockholm, Sweden",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "remote",
    availability: "active",
    years: 7,
    compensation: { min: 135, max: 170, currency: "EUR" },
    skills: [
      "PyTorch",
      "MLflow",
      "Ray",
      "Feature stores",
      "Kubernetes",
      "Weights & Biases",
      "Python",
      "Go",
    ],
    languages: ["Swedish", "English"],
    bio: "Seven years shipping production ML — search ranking, recommendation, fraud detection. Equally comfortable debugging a DataLoader at 2 AM and reviewing a roadmap with a product VP.",
    experience: [
      {
        company: "Klarna",
        role: "Senior ML Engineer",
        period: "2022 — present",
        description:
          "Owned real-time fraud scoring across 12 markets; reduced false positives by 34% with a streaming feature pipeline.",
      },
      {
        company: "Spotify",
        role: "ML Engineer",
        period: "2019 — 2022",
        description:
          "Contributed to playlist recommendation; built evaluation tooling used by three sibling teams.",
      },
    ],
    education: [
      {
        school: "KTH Royal Institute of Technology",
        degree: "MSc, Machine Learning",
        period: "2015 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Streaming feature store",
        summary:
          "Designed a low-latency feature store backing 40+ production models.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    featured: true,
    lastActiveDays: 1,
  },
  {
    slug: "felix-ando",
    name: "Felix Ando",
    title: "Staff Backend Engineer",
    headline:
      "Designs distributed systems that behave predictably under failure.",
    discipline: "backend",
    level: "staff",
    location: "Tokyo, Japan",
    region: "APAC",
    timezone: "UTC+9",
    workMode: "hybrid",
    availability: "open",
    years: 11,
    compensation: { min: 220, max: 280, currency: "USD" },
    skills: [
      "Go",
      "Rust",
      "PostgreSQL",
      "gRPC",
      "Kafka",
      "Temporal",
      "Distributed tracing",
      "Chaos engineering",
    ],
    languages: ["Japanese", "English"],
    bio: "Eleven years on backend platforms at scale. Fluent in the grammar of distributed systems — idempotency, backpressure, partial failure — and the quiet craft of reviewing a runbook.",
    experience: [
      {
        company: "Mercari",
        role: "Staff Software Engineer",
        period: "2020 — present",
        description:
          "Led the payments reliability initiative; authored the company's standard for idempotent write paths.",
      },
      {
        company: "Google",
        role: "Senior Software Engineer",
        period: "2016 — 2020",
        description: "Storage infrastructure on Spanner; on-call for 3 years.",
      },
    ],
    education: [
      {
        school: "University of Tokyo",
        degree: "BEng, Information Science",
        period: "2010 — 2014",
      },
    ],
    selectedWork: [
      {
        title: "idem — idempotency middleware",
        summary:
          "Open-source Go middleware for safe retries, used in half a dozen production systems.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 5,
  },
  {
    slug: "nadia-okafor",
    name: "Nadia Okafor",
    title: "Senior Product Designer",
    headline:
      "Designs interfaces with editorial rigor — typography, hierarchy, restraint.",
    discipline: "design",
    level: "senior",
    location: "Lagos, Nigeria",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "remote",
    availability: "active",
    years: 8,
    compensation: { min: 110, max: 150, currency: "USD" },
    skills: [
      "Figma",
      "Design systems",
      "Interaction design",
      "Typography",
      "Prototyping",
      "User research",
      "Accessibility",
    ],
    languages: ["English", "Yoruba"],
    bio: "Eight years designing fintech and developer tools across four continents. Holds a quiet allergy to decorative illustration and a deep respect for a well-set paragraph.",
    experience: [
      {
        company: "Paystack",
        role: "Senior Product Designer",
        period: "2021 — present",
        description:
          "Leads design for the merchant dashboard — 40k+ businesses across Africa.",
      },
      {
        company: "Intercom",
        role: "Product Designer",
        period: "2018 — 2021",
        description:
          "Shipped the messaging composer redesign; co-authored the internal design system.",
      },
    ],
    education: [
      {
        school: "University of Lagos",
        degree: "BA, Visual Communication",
        period: "2013 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Paystack Merchant 2.0",
        summary:
          "A six-month redesign of the merchant dashboard that reduced time-to-first-payout by 40%.",
      },
    ],
    links: {
      website: "https://example.com/nadia",
      linkedin: "https://linkedin.com/in/example",
    },
    featured: true,
    lastActiveDays: 3,
  },
  {
    slug: "joshua-friedman",
    name: "Joshua Friedman",
    title: "Staff Platform Engineer",
    headline:
      "Builds developer platforms that feel invisible — in the best way.",
    discipline: "platform",
    level: "staff",
    location: "Berlin, Germany",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "remote",
    availability: "open",
    years: 12,
    compensation: { min: 170, max: 210, currency: "EUR" },
    skills: [
      "Kubernetes",
      "Terraform",
      "Go",
      "AWS",
      "eBPF",
      "Prometheus",
      "Service mesh",
      "Incident response",
    ],
    languages: ["English", "German"],
    bio: "Twelve years making infrastructure quieter. Previously ran the platform org at a scaled B2B SaaS; believes the best platform announcements are the ones no one notices.",
    experience: [
      {
        company: "HashiCorp",
        role: "Staff Engineer, Platform",
        period: "2021 — present",
        description:
          "Led the internal platform rewrite; reduced deploy p95 by 6×.",
      },
      {
        company: "Zalando",
        role: "Principal Engineer",
        period: "2016 — 2021",
        description:
          "Owned the multi-region Kubernetes story; authored the team's SRE runbook.",
      },
    ],
    education: [
      {
        school: "TU Berlin",
        degree: "MSc, Distributed Systems",
        period: "2010 — 2012",
      },
    ],
    selectedWork: [
      {
        title: "Quiet platforms — a talk",
        summary:
          "Kubecon talk on designing platforms that earn trust through restraint.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 9,
  },
  {
    slug: "priya-balasubramanian",
    name: "Priya Balasubramanian",
    title: "Senior Data Scientist",
    headline:
      "Turns messy business questions into rigorous, decision-grade answers.",
    discipline: "data",
    level: "senior",
    location: "Bangalore, India",
    region: "APAC",
    timezone: "UTC+5:30",
    workMode: "hybrid",
    availability: "active",
    years: 9,
    compensation: { min: 90, max: 130, currency: "USD" },
    skills: [
      "Python",
      "R",
      "SQL",
      "Causal inference",
      "Experimentation",
      "dbt",
      "Tableau",
      "Forecasting",
    ],
    languages: ["English", "Tamil", "Hindi"],
    bio: "Nine years translating business questions into models — pricing, marketing mix, churn. Teaches graduate statistics part-time; allergic to vanity metrics.",
    experience: [
      {
        company: "Flipkart",
        role: "Senior Data Scientist",
        period: "2021 — present",
        description:
          "Leads pricing experimentation; designed the promotion ROI framework now used across three business lines.",
      },
      {
        company: "McKinsey",
        role: "Data Scientist, QuantumBlack",
        period: "2017 — 2021",
        description: "Consulting engagements across retail and logistics.",
      },
    ],
    education: [
      {
        school: "Indian Statistical Institute",
        degree: "MStat, Statistics",
        period: "2015 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Promotion ROI framework",
        summary:
          "A causal approach to measuring promo lift; shipped across India and SEA.",
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 0,
  },
  {
    slug: "esme-laurent",
    name: "Esmé Laurent",
    title: "Principal Product Designer",
    headline:
      "Senior designer working at the intersection of type, motion, and product.",
    discipline: "design",
    level: "principal",
    location: "Paris, France",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "hybrid",
    availability: "passive",
    years: 15,
    compensation: { min: 180, max: 230, currency: "EUR" },
    skills: [
      "Figma",
      "Type design",
      "Motion",
      "Design leadership",
      "Brand systems",
      "Prototyping",
    ],
    languages: ["French", "English", "Italian"],
    bio: "Fifteen years of design leadership across editorial, fashion-tech, and enterprise software. Previously head of design at a European unicorn; currently consulting and lecturing at ÉCAL.",
    experience: [
      {
        company: "Independent",
        role: "Design Lead (consulting)",
        period: "2024 — present",
        description: "Brand and product systems for three venture-backed teams.",
      },
      {
        company: "Qonto",
        role: "Head of Design",
        period: "2020 — 2024",
        description: "Built the design org from 8 to 32 across four cities.",
      },
    ],
    education: [
      {
        school: "École des Arts Décoratifs",
        degree: "MFA, Graphic Design",
        period: "2006 — 2011",
      },
    ],
    selectedWork: [
      {
        title: "Qonto design system v3",
        summary:
          "A complete rethink of Qonto's design language, shipped across web and native apps.",
      },
    ],
    links: {
      website: "https://example.com/esme",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 28,
  },
  {
    slug: "kai-nakamura",
    name: "Kai Nakamura",
    title: "Senior Frontend Engineer",
    headline:
      "Specialist in performant, accessible interfaces — the kind that disappear.",
    discipline: "frontend",
    level: "senior",
    location: "Vancouver, Canada",
    region: "Americas",
    timezone: "UTC−8",
    workMode: "remote",
    availability: "open",
    years: 8,
    compensation: { min: 155, max: 190, currency: "USD" },
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Accessibility (WCAG)",
      "Performance",
      "Framer Motion",
      "WebGL",
    ],
    languages: ["English", "Japanese"],
    bio: "Eight years shipping the front of the house. Previously led accessibility at a fintech; believes a fast page is an ethical page.",
    experience: [
      {
        company: "Shopify",
        role: "Senior Frontend Engineer",
        period: "2022 — present",
        description:
          "Merchant admin performance lead; reduced p75 admin TTI by 42%.",
      },
      {
        company: "Wealthsimple",
        role: "Frontend Engineer",
        period: "2018 — 2022",
        description:
          "Led the accessibility working group; drove platform compliance to AA across all surfaces.",
      },
    ],
    education: [
      {
        school: "University of British Columbia",
        degree: "BSc, Computer Science",
        period: "2014 — 2018",
      },
    ],
    selectedWork: [
      {
        title: "Admin performance rewrite",
        summary:
          "Incremental re-architecture of Shopify's merchant admin, shaving ~1.2s off TTI.",
      },
    ],
    links: {
      github: "https://github.com/example",
      website: "https://example.com/kai",
    },
    lastActiveDays: 4,
  },
  {
    slug: "marcus-delgado",
    name: "Marcus Delgado",
    title: "Staff Full-Stack Engineer",
    headline:
      "Generalist engineer who has shipped every layer of the stack, repeatedly.",
    discipline: "full-stack",
    level: "staff",
    location: "Mexico City, Mexico",
    region: "Americas",
    timezone: "UTC−6",
    workMode: "remote",
    availability: "active",
    years: 10,
    compensation: { min: 160, max: 200, currency: "USD" },
    skills: [
      "TypeScript",
      "Node.js",
      "Go",
      "PostgreSQL",
      "React",
      "AWS",
      "gRPC",
    ],
    languages: ["Spanish", "English"],
    bio: "Ten years across startups and scale-ups. Three founding-engineer stints, one meaningful exit, and a standing rule: ship the boring path first.",
    experience: [
      {
        company: "Kavak",
        role: "Staff Engineer",
        period: "2022 — present",
        description:
          "Leads the pricing platform; drove a 3× improvement in price freshness.",
      },
      {
        company: "Rappi",
        role: "Senior Engineer",
        period: "2018 — 2022",
        description:
          "Courier assignment and routing systems across LatAm markets.",
      },
    ],
    education: [
      {
        school: "ITAM",
        degree: "BSc, Applied Mathematics",
        period: "2011 — 2015",
      },
    ],
    selectedWork: [
      {
        title: "Pricing platform rewrite",
        summary:
          "Migrated a fragile monolith pricing engine to a modular Go service with full replay support.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 1,
  },
  {
    slug: "soraya-farsi",
    name: "Soraya Farsi",
    title: "Senior AI/ML Engineer",
    headline:
      "LLM systems engineer focused on evaluation, alignment, and safe deployment.",
    discipline: "ai-ml",
    level: "senior",
    location: "Amsterdam, Netherlands",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "hybrid",
    availability: "open",
    years: 6,
    compensation: { min: 140, max: 175, currency: "EUR" },
    skills: [
      "PyTorch",
      "LangGraph",
      "Evaluation",
      "Prompt engineering",
      "Retrieval",
      "Safety testing",
      "Python",
    ],
    languages: ["English", "Persian", "Dutch"],
    bio: "Six years between applied research and platform engineering. Currently contributing to open-source evaluation tooling; previously at a frontier lab working on red-team harnesses.",
    experience: [
      {
        company: "Booking.com",
        role: "Senior ML Engineer",
        period: "2023 — present",
        description:
          "LLM-powered agent platform for customer service; owned eval harness from scratch.",
      },
      {
        company: "Cohere",
        role: "ML Engineer",
        period: "2020 — 2023",
        description:
          "Fine-tuning and alignment; contributor to the safety evaluations suite.",
      },
    ],
    education: [
      {
        school: "University of Amsterdam",
        degree: "MSc, Artificial Intelligence",
        period: "2016 — 2018",
      },
    ],
    selectedWork: [
      {
        title: "Red-team harness",
        summary:
          "Internal tool for adversarial evaluation of instruction-tuned LLMs.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 6,
  },
  {
    slug: "lena-weiss",
    name: "Dr. Lena Weiss",
    title: "Staff Research Engineer",
    headline:
      "Bridges peer-reviewed research and production robotics systems.",
    discipline: "research",
    level: "staff",
    location: "Zurich, Switzerland",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "onsite",
    availability: "passive",
    years: 12,
    compensation: { min: 220, max: 280, currency: "EUR" },
    skills: [
      "C++",
      "ROS",
      "SLAM",
      "Perception",
      "Control theory",
      "PyTorch",
      "CUDA",
    ],
    languages: ["German", "English", "French"],
    bio: "Twelve years between academia and industry. PhD on visual-inertial SLAM; currently at ETH's autonomous systems lab, with a parallel industry role.",
    experience: [
      {
        company: "ETH Zurich",
        role: "Senior Research Scientist",
        period: "2020 — present",
        description:
          "Leads a team of five on perception for autonomous construction vehicles.",
      },
    ],
    education: [
      {
        school: "ETH Zurich",
        degree: "PhD, Robotics",
        period: "2013 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Visual-inertial SLAM for construction sites",
        summary:
          "Peer-reviewed body of work on SLAM under poor lighting and dust.",
      },
    ],
    links: {
      website: "https://example.com/lena",
    },
    lastActiveDays: 45,
  },
  {
    slug: "benjamin-osei",
    name: "Benjamin Osei",
    title: "Senior Backend Engineer",
    headline:
      "Builds payments and ledger systems with obsessive attention to correctness.",
    discipline: "backend",
    level: "senior",
    location: "Accra, Ghana",
    region: "EMEA",
    timezone: "UTC+0",
    workMode: "remote",
    availability: "active",
    years: 7,
    compensation: { min: 110, max: 145, currency: "USD" },
    skills: [
      "Go",
      "Kotlin",
      "PostgreSQL",
      "Event sourcing",
      "Payments",
      "Double-entry accounting",
    ],
    languages: ["English", "Twi"],
    bio: "Seven years building financial infrastructure across Africa. Maintains a double-entry ledger library in Go; has opinions about money.",
    experience: [
      {
        company: "Flutterwave",
        role: "Senior Backend Engineer",
        period: "2021 — present",
        description:
          "Built the merchant reconciliation service handling 2M+ transactions/day.",
      },
    ],
    education: [
      {
        school: "Ashesi University",
        degree: "BSc, Computer Science",
        period: "2014 — 2018",
      },
    ],
    selectedWork: [
      {
        title: "Ledger-go",
        summary:
          "An open double-entry ledger library designed for financial correctness.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 2,
  },
  {
    slug: "iris-chen",
    name: "Iris Chen",
    title: "Staff Product Manager",
    headline: "PM-engineer hybrid shipping developer products teams actually love.",
    discipline: "product",
    level: "staff",
    location: "Singapore",
    region: "APAC",
    timezone: "UTC+8",
    workMode: "hybrid",
    availability: "open",
    years: 11,
    compensation: { min: 200, max: 260, currency: "USD" },
    skills: [
      "Developer products",
      "Roadmapping",
      "User research",
      "Analytics",
      "Technical writing",
      "Go-to-market",
    ],
    languages: ["English", "Mandarin"],
    bio: "Eleven years as PM; three as an engineer before that. Has led developer-product teams at Stripe and GitLab; writes a monthly essay on product strategy that reaches 40k readers.",
    experience: [
      {
        company: "Stripe",
        role: "Staff PM, Developer Platform",
        period: "2022 — present",
        description:
          "Owns SDK and CLI roadmap; led the v10 API migration with zero downtime.",
      },
      {
        company: "GitLab",
        role: "Senior PM",
        period: "2018 — 2022",
        description: "CI/CD workflows; shipped pipeline insights.",
      },
    ],
    education: [
      {
        school: "NUS",
        degree: "BEng, Computer Engineering",
        period: "2010 — 2014",
      },
    ],
    selectedWork: [
      {
        title: "Stripe CLI v2",
        summary:
          "Directed the reimagination of Stripe's CLI — adoption doubled within six months.",
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
      website: "https://example.com/iris",
    },
    featured: true,
    lastActiveDays: 7,
  },
  {
    slug: "nicolas-berger",
    name: "Nicolas Berger",
    title: "Senior DevOps Engineer",
    headline: "SRE with a reliability obsession and a pragmatist's budget sense.",
    discipline: "platform",
    level: "senior",
    location: "Montréal, Canada",
    region: "Americas",
    timezone: "UTC−5",
    workMode: "remote",
    availability: "open",
    years: 8,
    compensation: { min: 145, max: 180, currency: "USD" },
    skills: [
      "AWS",
      "Terraform",
      "Kubernetes",
      "Datadog",
      "Python",
      "Go",
      "Incident response",
    ],
    languages: ["French", "English"],
    bio: "Eight years on reliability. Runs a quiet homelab; has a soft spot for runbooks that read like cookbooks.",
    experience: [
      {
        company: "Shopify",
        role: "Senior SRE",
        period: "2020 — present",
        description:
          "Reliability lead for checkout; reduced Sev-1 minutes by 60% YoY.",
      },
    ],
    education: [
      {
        school: "Université de Montréal",
        degree: "BSc, Computer Science",
        period: "2013 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Runbook templates",
        summary: "Published templates adopted by three neighbouring teams.",
      },
    ],
    links: {
      github: "https://github.com/example",
    },
    lastActiveDays: 5,
  },
  {
    slug: "yusuf-adesanya",
    name: "Yusuf Adesanya",
    title: "Mid-level Mobile Engineer",
    headline:
      "iOS & Android practitioner with a taste for offline-first architectures.",
    discipline: "mobile",
    level: "mid",
    location: "Cape Town, South Africa",
    region: "EMEA",
    timezone: "UTC+2",
    workMode: "remote",
    availability: "active",
    years: 4,
    compensation: { min: 75, max: 105, currency: "USD" },
    skills: [
      "Swift",
      "Kotlin",
      "Jetpack Compose",
      "SwiftUI",
      "Offline sync",
      "Combine",
      "Coroutines",
    ],
    languages: ["English", "Yoruba"],
    bio: "Four years shipping native mobile at two fintechs. Quietly proud of a sync engine that works on a three-bar EDGE connection.",
    experience: [
      {
        company: "Yoco",
        role: "Mobile Engineer",
        period: "2022 — present",
        description:
          "Led the Android rewrite to Jetpack Compose; shipped offline-first transactions.",
      },
    ],
    education: [
      {
        school: "University of Cape Town",
        degree: "BSc, Computer Science",
        period: "2017 — 2021",
      },
    ],
    selectedWork: [
      {
        title: "Offline-first sync engine",
        summary:
          "Custom sync engine for low-connectivity markets, open-sourced with the team's blessing.",
      },
    ],
    links: {
      github: "https://github.com/example",
    },
    lastActiveDays: 0,
  },
  {
    slug: "hannah-cho",
    name: "Hannah Cho",
    title: "Senior Design Systems Engineer",
    headline:
      "Design-engineer hybrid shipping the connective tissue between product and brand.",
    discipline: "frontend",
    level: "senior",
    location: "Seoul, South Korea",
    region: "APAC",
    timezone: "UTC+9",
    workMode: "hybrid",
    availability: "open",
    years: 7,
    compensation: { min: 140, max: 180, currency: "USD" },
    skills: [
      "TypeScript",
      "React",
      "CSS architecture",
      "Design tokens",
      "Storybook",
      "Figma",
      "Accessibility",
    ],
    languages: ["Korean", "English"],
    bio: "Seven years bridging design and engineering. Built a design system adopted by 80+ internal teams; teaches a workshop on design tokens each spring.",
    experience: [
      {
        company: "Naver",
        role: "Senior Engineer, Design Systems",
        period: "2021 — present",
        description:
          "Led the design system rewrite; authored the token pipeline now adopted org-wide.",
      },
    ],
    education: [
      {
        school: "KAIST",
        degree: "MSc, HCI",
        period: "2015 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Chromatic — design token pipeline",
        summary:
          "End-to-end pipeline from Figma variables to typed TypeScript exports.",
      },
    ],
    links: {
      github: "https://github.com/example",
      website: "https://example.com/hannah",
    },
    lastActiveDays: 11,
  },
  {
    slug: "tomas-ribeiro",
    name: "Tomás Ribeiro",
    title: "Staff Data Engineer",
    headline:
      "Analytics engineer who thinks in data contracts and tests first.",
    discipline: "data",
    level: "staff",
    location: "São Paulo, Brazil",
    region: "Americas",
    timezone: "UTC−3",
    workMode: "remote",
    availability: "active",
    years: 10,
    compensation: { min: 150, max: 190, currency: "USD" },
    skills: [
      "SQL",
      "dbt",
      "Snowflake",
      "Airflow",
      "Python",
      "Data contracts",
      "Kafka",
    ],
    languages: ["Portuguese", "English", "Spanish"],
    bio: "Ten years making data trustworthy. Runs a quarterly workshop on data contracts; has a bias toward making pipelines legible before making them fast.",
    experience: [
      {
        company: "Nubank",
        role: "Staff Data Engineer",
        period: "2021 — present",
        description:
          "Leads the data platform's contracts initiative; authored the internal standard.",
      },
    ],
    education: [
      {
        school: "USP",
        degree: "BSc, Computer Science",
        period: "2012 — 2016",
      },
    ],
    selectedWork: [
      {
        title: "Data contracts at scale",
        summary:
          "Public talks and a reference implementation for a 10-billion-row environment.",
      },
    ],
    links: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 1,
  },
  {
    slug: "eliska-novak",
    name: "Eliška Novák",
    title: "Senior Full-Stack Engineer",
    headline: "Product engineer who ships carefully and refactors fearlessly.",
    discipline: "full-stack",
    level: "senior",
    location: "Prague, Czechia",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "remote",
    availability: "open",
    years: 8,
    compensation: { min: 115, max: 150, currency: "EUR" },
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "GraphQL",
      "Tailwind",
    ],
    languages: ["Czech", "English", "German"],
    bio: "Eight years as a product engineer at design-led teams. Believes the best engineers are the ones your designers actively seek out.",
    experience: [
      {
        company: "Productboard",
        role: "Senior Engineer",
        period: "2020 — present",
        description:
          "Product engineer on the insights team; drove the editor rewrite.",
      },
    ],
    education: [
      {
        school: "Charles University",
        degree: "BSc, Computer Science",
        period: "2013 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Insights editor rewrite",
        summary: "A one-quarter rewrite that unlocked six quarters of roadmap.",
      },
    ],
    links: {
      github: "https://github.com/example",
    },
    lastActiveDays: 4,
  },
  {
    slug: "rohan-varghese",
    name: "Rohan Varghese",
    title: "Mid-level AI Engineer",
    headline: "Applied engineer specializing in RAG and structured LLM outputs.",
    discipline: "ai-ml",
    level: "mid",
    location: "Kochi, India",
    region: "APAC",
    timezone: "UTC+5:30",
    workMode: "remote",
    availability: "active",
    years: 3,
    compensation: { min: 55, max: 85, currency: "USD" },
    skills: [
      "Python",
      "LangChain",
      "LlamaIndex",
      "Pydantic",
      "Postgres + pgvector",
      "FastAPI",
    ],
    languages: ["English", "Malayalam"],
    bio: "Three years in applied AI. Ships small, legible systems; has published thoughtful writeups on getting structured outputs out of LLMs reliably.",
    experience: [
      {
        company: "Freshworks",
        role: "AI Engineer",
        period: "2023 — present",
        description:
          "Built the customer-support RAG system serving 2M queries/month.",
      },
    ],
    education: [
      {
        school: "NIT Trichy",
        degree: "B.Tech, Computer Science",
        period: "2018 — 2022",
      },
    ],
    selectedWork: [
      {
        title: "Typed outputs for LLMs — a writeup",
        summary:
          "A widely-shared essay on Pydantic, jsonschema, and practical tooling for structured outputs.",
      },
    ],
    links: {
      github: "https://github.com/example",
    },
    lastActiveDays: 1,
  },
  {
    slug: "aurora-sanchez",
    name: "Aurora Sánchez",
    title: "Senior Product Designer",
    headline:
      "Designs calm, editorial software for consumer and creative-tool teams.",
    discipline: "design",
    level: "senior",
    location: "Barcelona, Spain",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "hybrid",
    availability: "open",
    years: 9,
    compensation: { min: 105, max: 140, currency: "EUR" },
    skills: [
      "Figma",
      "Interaction design",
      "Editorial design",
      "Prototyping",
      "Sound design",
      "Research",
    ],
    languages: ["Spanish", "Catalan", "English"],
    bio: "Nine years designing consumer creative tools. Previously at a well-known audio company; currently consulting for a reading app you probably love.",
    experience: [
      {
        company: "Independent",
        role: "Product Designer (consulting)",
        period: "2024 — present",
        description: "Reading and audio apps.",
      },
      {
        company: "SoundCloud",
        role: "Senior Product Designer",
        period: "2019 — 2024",
        description: "Led the creator analytics experience.",
      },
    ],
    education: [
      {
        school: "ELISAVA",
        degree: "BA, Industrial Design",
        period: "2011 — 2015",
      },
    ],
    selectedWork: [
      {
        title: "Creator analytics",
        summary:
          "Redesigned a dense analytics surface to read like a narrative.",
      },
    ],
    links: {
      website: "https://example.com/aurora",
    },
    lastActiveDays: 14,
  },
  {
    slug: "caleb-morgan",
    name: "Caleb Morgan",
    title: "Junior Frontend Engineer",
    headline:
      "Recent grad shipping polished React work; quietly obsessed with motion.",
    discipline: "frontend",
    level: "junior",
    location: "Austin, United States",
    region: "Americas",
    timezone: "UTC−6",
    workMode: "remote",
    availability: "active",
    years: 1,
    compensation: { min: 85, max: 115, currency: "USD" },
    skills: ["TypeScript", "React", "Framer Motion", "Tailwind", "Next.js"],
    languages: ["English"],
    bio: "One year of full-time frontend, three years of studied side projects. Ships calmly; a portfolio that reads like a graduate thesis.",
    experience: [
      {
        company: "Ramp",
        role: "Frontend Engineer",
        period: "2024 — present",
        description: "Onboarding flows and internal admin surfaces.",
      },
    ],
    education: [
      {
        school: "UT Austin",
        degree: "BS, Computer Science",
        period: "2020 — 2024",
      },
    ],
    selectedWork: [
      {
        title: "Motion playground",
        summary:
          "A personal site exploring editorial motion patterns in product UI.",
      },
    ],
    links: {
      github: "https://github.com/example",
      website: "https://example.com/caleb",
    },
    lastActiveDays: 3,
  },
  {
    slug: "mei-lin-takahashi",
    name: "Mei-Lin Takahashi",
    title: "Senior Product Manager",
    headline:
      "Consumer PM with a quantitative bent and a taste for contrarian bets.",
    discipline: "product",
    level: "senior",
    location: "Taipei, Taiwan",
    region: "APAC",
    timezone: "UTC+8",
    workMode: "hybrid",
    availability: "open",
    years: 8,
    compensation: { min: 150, max: 195, currency: "USD" },
    skills: [
      "Consumer product",
      "Growth",
      "Experimentation",
      "Analytics",
      "User research",
    ],
    languages: ["Mandarin", "English", "Japanese"],
    bio: "Eight years on consumer products. Former data scientist; brings a quant's skepticism to product discussions.",
    experience: [
      {
        company: "Line",
        role: "Senior PM, Growth",
        period: "2021 — present",
        description:
          "Led onboarding experimentation; shipped a reactivation flow now used across Asia.",
      },
    ],
    education: [
      {
        school: "National Taiwan University",
        degree: "MSc, Statistics",
        period: "2014 — 2016",
      },
    ],
    selectedWork: [
      {
        title: "Reactivation flow rewrite",
        summary: "A six-month bet that paid back in three.",
      },
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
    },
    lastActiveDays: 8,
  },
  {
    slug: "oskar-lindgren",
    name: "Oskar Lindgren",
    title: "Staff ML Infrastructure Engineer",
    headline:
      "Builds the training and serving infrastructure ML teams forget they needed.",
    discipline: "platform",
    level: "staff",
    location: "Oslo, Norway",
    region: "EMEA",
    timezone: "UTC+1",
    workMode: "remote",
    availability: "passive",
    years: 13,
    compensation: { min: 185, max: 235, currency: "EUR" },
    skills: [
      "Kubernetes",
      "Ray",
      "vLLM",
      "GPU scheduling",
      "Python",
      "Go",
      "Triton",
    ],
    languages: ["Norwegian", "English"],
    bio: "Thirteen years across platform and ML. Currently runs the model-serving platform at a Nordic bank; writes a quarterly newsletter on GPU utilization in production.",
    experience: [
      {
        company: "DNB",
        role: "Staff Engineer, ML Platform",
        period: "2021 — present",
        description:
          "Leads the model-serving platform — 60+ models across 3 clouds.",
      },
    ],
    education: [
      {
        school: "NTNU",
        degree: "MSc, Computer Science",
        period: "2010 — 2012",
      },
    ],
    selectedWork: [
      {
        title: "GPU utilization newsletter",
        summary:
          "A practitioner's digest read by ML platform teams at 40+ companies.",
      },
    ],
    links: {
      website: "https://example.com/oskar",
    },
    lastActiveDays: 22,
  },
  {
    slug: "zara-qureshi",
    name: "Zara Qureshi",
    title: "Senior Backend Engineer",
    headline:
      "Ships quietly excellent APIs; has a bias toward deleting code.",
    discipline: "backend",
    level: "senior",
    location: "Dubai, United Arab Emirates",
    region: "EMEA",
    timezone: "UTC+4",
    workMode: "hybrid",
    availability: "active",
    years: 8,
    compensation: { min: 135, max: 170, currency: "USD" },
    skills: [
      "Python",
      "Go",
      "PostgreSQL",
      "Redis",
      "AWS",
      "REST / GraphQL",
      "Terraform",
    ],
    languages: ["English", "Urdu", "Arabic"],
    bio: "Eight years shipping backend at fintechs and marketplaces. Her team's favourite line: 'Zara's PR deletes more than it adds.'",
    experience: [
      {
        company: "Careem",
        role: "Senior Backend Engineer",
        period: "2022 — present",
        description:
          "Owns the payments reconciliation service; drove a 40% reduction in incident volume.",
      },
    ],
    education: [
      {
        school: "LUMS",
        degree: "BSc, Computer Science",
        period: "2013 — 2017",
      },
    ],
    selectedWork: [
      {
        title: "Reconciliation service rewrite",
        summary:
          "Replaced a fragile cron-based system with an event-sourced service.",
      },
    ],
    links: {
      github: "https://github.com/example",
    },
    lastActiveDays: 0,
  },
  {
    slug: "lucas-moreau",
    name: "Lucas Moreau",
    title: "Senior AI Research Engineer",
    headline:
      "Bridges NLP research and product; published, cited, and still shipping.",
    discipline: "research",
    level: "senior",
    location: "Montréal, Canada",
    region: "Americas",
    timezone: "UTC−5",
    workMode: "hybrid",
    availability: "open",
    years: 7,
    compensation: { min: 175, max: 220, currency: "USD" },
    skills: [
      "PyTorch",
      "HuggingFace",
      "Reinforcement learning",
      "Information retrieval",
      "C++",
    ],
    languages: ["French", "English"],
    bio: "Seven years at Mila and Meta. Currently working on retrieval for long-form question answering; papers you may have cited.",
    experience: [
      {
        company: "Meta AI",
        role: "Research Engineer",
        period: "2022 — present",
        description: "Retrieval for long-context QA.",
      },
      {
        company: "Mila",
        role: "Research Engineer",
        period: "2019 — 2022",
        description: "Under Yoshua Bengio's group.",
      },
    ],
    education: [
      {
        school: "McGill University",
        degree: "MSc, Computer Science",
        period: "2017 — 2019",
      },
    ],
    selectedWork: [
      {
        title: "Dense retrieval for long-context QA",
        summary: "Cited 450+ times across the NLP literature.",
      },
    ],
    links: {
      website: "https://example.com/lucas",
    },
    lastActiveDays: 6,
  },
]

export function getCandidateBySlug(slug: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.slug === slug)
}

export function getAllSlugs(): string[] {
  return CANDIDATES.map((c) => c.slug)
}

export function getAllSkills(): string[] {
  const set = new Set<string>()
  for (const c of CANDIDATES) c.skills.forEach((s) => set.add(s))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export function getStats() {
  const byDiscipline = Object.keys(DISCIPLINES).reduce(
    (acc, key) => {
      acc[key as Discipline] = CANDIDATES.filter(
        (c) => c.discipline === (key as Discipline),
      ).length
      return acc
    },
    {} as Record<Discipline, number>,
  )

  return {
    total: CANDIDATES.length,
    active: CANDIDATES.filter((c) => c.availability === "active").length,
    open: CANDIDATES.filter((c) => c.availability === "open").length,
    disciplines: Object.keys(DISCIPLINES).length,
    countries: new Set(CANDIDATES.map((c) => c.location.split(",").pop()?.trim()))
      .size,
    byDiscipline,
  }
}
