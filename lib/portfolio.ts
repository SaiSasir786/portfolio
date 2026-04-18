export const profile = {
  name: "Sai Sasir K",
  role: "Gen-AI & ML Engineer",
  tagline: "Designing intelligent systems with precision and restraint.",
  location: "Available worldwide · Remote-first",
  status: "Open to new opportunities",
  email: "saisasir99@gmail.com",
  intro:
    "I'm an applied AI and ML engineer working across large language models, retrieval architectures, and the quiet discipline of making intelligent systems behave reliably in production. My work sits at the seam between research and shipped engineering — model fine-tuning, retrieval pipelines, evaluation harnesses, and the infrastructure that holds it all together.",
  philosophy:
    "A background in AI and Robotics shapes how I think about intelligence — as something that must perceive, reason, and act within real constraints, not just on a benchmark. I believe the most durable AI is built through careful engineering, close collaboration with domain experts, and an unromantic focus on outcomes.",
  socials: [
    { label: "Email", href: "mailto:saisasir99@gmail.com", handle: "saisasir99@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saisasirkosuri/", handle: "saisasirkosuri" },
    { label: "GitHub", href: "https://github.com/SaiSasir786", handle: "SaiSasir786" },
  ],
}

export const stats = [
  { value: "3+", label: "Shipped projects" },
  { value: "AWS", label: "Certified practitioner" },
  { value: "8.2", label: "CGPA · VIT" },
  { value: "'25", label: "AI & Robotics graduate" },
]

export type Expertise = {
  id: string
  title: string
  summary: string
  tools: string[]
}

export const expertise: Expertise[] = [
  {
    id: "genai",
    title: "Generative AI & LLMs",
    summary:
      "Fine-tuning foundation models, designing retrieval-augmented pipelines, and deploying multimodal language systems with production-grade reliability.",
    tools: ["LLaMA", "GPT-4", "Claude", "RAG", "LoRA / PEFT"],
  },
  {
    id: "ml-eng",
    title: "ML Engineering",
    summary:
      "End-to-end machine learning pipelines — ingestion, training, serving, observability, and continuous evaluation. Rigorous by default.",
    tools: ["PyTorch", "TensorFlow", "MLflow", "W&B", "CUDA"],
  },
  {
    id: "agents",
    title: "Agents & Applied Systems",
    summary:
      "Autonomous agent architectures, tool-integrated workflows, and reasoning systems that perform reliably under real-world constraints.",
    tools: ["LangChain", "LlamaIndex", "AutoGen", "CrewAI", "Tool Use"],
  },
  {
    id: "robotics",
    title: "Robotics & Embodied AI",
    summary:
      "Perception and control systems that bridge physical hardware with learned behaviour — through sensor fusion, computer vision, and real-time inference.",
    tools: ["ROS", "OpenCV", "SLAM", "Sensor Fusion", "Raspberry Pi"],
  },
]

export type Project = {
  id: string
  index: string
  title: string
  year: string
  tags: string[]
  summary: string
  detail: string
  stack: string[]
  href?: string
}

export const projects: Project[] = [
  {
    id: "travel-assistant",
    index: "I",
    title: "Conversational Travel Assistant",
    year: "2024",
    tags: ["Gen-AI", "NLP"],
    summary:
      "A natural-language booking agent built on Dialogflow with Telegram delivery and a transactional MySQL backend.",
    detail:
      "Engineered custom intent and entity models on Google Dialogflow, delivered through the Telegram API for real-time conversation. Designed a structured MySQL backend with PHP service endpoints, closing the loop on an end-to-end booking flow that required no human intervention.",
    stack: ["Dialogflow", "JavaScript", "PHP", "MySQL", "Telegram API"],
  },
  {
    id: "marketplace",
    index: "II",
    title: "Full-Stack Marketplace Platform",
    year: "2024",
    tags: ["Full-Stack", "MERN"],
    summary:
      "A production-grade virtual showroom — browse, list, and transact — engineered end-to-end on the MERN stack.",
    detail:
      "Designed RESTful services with Express.js, a React frontend with disciplined state management, and MongoDB for flexible schema evolution. Included authenticated sessions, dynamic inventory, and a lightweight recommendation layer built on content similarity.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
  },
  {
    id: "rov",
    index: "III",
    title: "Autonomous Remote Vehicle",
    year: "2023",
    tags: ["Robotics", "Embodied AI"],
    summary:
      "A machine-learning-assisted ROV with real-time sensor fusion, wireless telemetry, and computer-vision obstacle awareness.",
    detail:
      "Designed the perception stack on a Raspberry Pi with OpenCV, fused input from multiple sensors for closed-loop control, and tuned a lightweight RF protocol for stable telemetry. A study in how much intelligence can be squeezed into a small, real-time system.",
    stack: ["Arduino", "Raspberry Pi", "Python", "OpenCV", "RF"],
  },
]

export type ExperienceItem = {
  role: string
  org: string
  period: string
  summary: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: "AI & Robotics Engineer (Independent)",
    org: "Research & applied projects",
    period: "2023 — Present",
    summary:
      "Independent applied work on LLM systems, retrieval pipelines, and robotics — translating research into shipped software.",
    bullets: [
      "Built a conversational booking agent on Dialogflow with a transactional MySQL backend, deployed through Telegram.",
      "Designed an ML-assisted remotely operated vehicle with real-time sensor fusion and computer-vision obstacle awareness.",
      "Engineered a full-stack marketplace platform with authenticated sessions and a content-similarity recommendation layer.",
    ],
  },
  {
    role: "B.Tech, AI & Robotics",
    org: "Vellore Institute of Technology (VIT)",
    period: "2021 — 2025",
    summary:
      "Core coursework in deep learning, reinforcement learning, computer vision, robotics, and systems engineering.",
    bullets: [
      "Graduated with a CGPA of 8.2 / 10.",
      "Capstone work focused on embodied AI and language-grounded control.",
      "AWS Certified Practitioner — cloud fundamentals for distributed ML workloads.",
    ],
  },
]

export const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
  "AI & ML": ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex", "scikit-learn"],
  Infrastructure: ["AWS", "Docker", "MLflow", "W&B", "CUDA", "REST APIs"],
  "Data & Storage": ["MongoDB", "MySQL", "PostgreSQL", "Vector DBs (pgvector, Pinecone)"],
  Frameworks: ["Next.js", "React", "Node.js", "Express", "FastAPI"],
}
