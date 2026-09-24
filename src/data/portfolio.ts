import {
  Layout,
  Server,
  Database,
  GitBranch,
  BrainCircuit,
  ChartNoAxesCombined,
  Network,
  Sparkles,
  Route,
  ShieldCheck,
  GraduationCap,
  Code2,
  Rocket,
  Briefcase,
  Github,
  Linkedin,
  Instagram,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type WorkCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

export const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "BS Computer Science • University of Sargodha (2024–2028)",
  },
  {
    icon: Code2,
    title: "Focus",
    desc: "Web Development, heavily invested in React ecosystem.",
  },
  {
    icon: Rocket,
    title: "Next Step",
    desc: "Expanding into Mobile App Development to build cross-platform solutions.",
  },
  {
    icon: Briefcase,
    title: "Goal",
    desc: "Building scalable SaaS platforms and high-performance user interfaces.",
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: Layout,
    color: "from-blue-500 to-cyan-500",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-violet-500 to-indigo-500",
    items: [
      "PHP",
      "Laravel",
      "MySQL",
      "MVC Architecture",
      "CRUD Operations",
      "Authentication",
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    items: ["MongoDB", "MySQL", "Mongoose"],
  },
  {
    category: "Tools & DevOps",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    items: ["Git", "GitHub", "Postman", "Vercel", "VS Code"],
  },
];

export const FEATURED_PROJECT = {
  title: "Multi-Tenant Team Workspace & Payroll SaaS",
  description:
    "A comprehensive SaaS-style application designed for small to medium businesses to manage their workforce, projects, and payroll from a single scalable platform.",
  features: [
    "Multi-company workspace isolation",
    "Role-based access control (Admin vs. Employee)",
    "Jira-like time tracking & task logging",
    "Integrated Slack-style team chat",
    "Automated, dynamic payroll calculations",
    "Monthly invoice & report generation",
  ],
  stack: ["React", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
  liveUrl: "https://core-flow-saas-app.vercel.app/",
  githubUrl: "https://github.com/ahmad-ibrahim-aheer/",
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
};

export const AI_WORK: WorkCard[] = [
  {
    title: "Supervised Learning & Model Optimization",
    description:
      "My supervised learning work brings together feature engineering, ensemble models, and hyperparameter tuning to develop and refine predictive models.",
    icon: BrainCircuit,
    skills: [
      "Supervised Learning",
      "Feature Engineering",
      "Ensemble Models",
      "Hyperparameter Tuning",
    ],
  },
  {
    title: "Stock-Market Prediction",
    description:
      "Exploring stock-market prediction using financial news alongside OHLCV data: open, high, low, close, and trading volume. My work includes named entity recognition (NER) and ticker extraction to connect news with relevant stocks.",
    icon: ChartNoAxesCombined,
    skills: ["Financial News", "OHLCV Data", "NER", "Ticker Extraction"],
  },
  {
    title: "Unsupervised Clustering",
    description:
      "Applying unsupervised clustering to explore patterns and group similar observations in data without predefined labels.",
    icon: Network,
    skills: ["Unsupervised Learning", "Clustering", "Pattern Discovery"],
  },
  {
    title: "Transformers & LLM Fine-Tuning",
    description:
      "Working with Transformer-based models and fine-tuning large language models, including decoder models, using Hugging Face and Python in Google Colab.",
    icon: Sparkles,
    skills: ["Transformers", "LLM Fine-Tuning", "Decoder Models"],
  },
];

export const LARAVEL_WORK: WorkCard[] = [
  {
    title: "Database & CRUD Projects",
    description:
      "Completed practical PHP and Laravel training projects using MySQL and CRUD operations to create, read, update, and delete application records.",
    icon: Database,
    skills: ["PHP", "Laravel", "MySQL", "CRUD Operations"],
  },
  {
    title: "Routing & MVC Architecture",
    description:
      "Applied Laravel routing and the Model–View–Controller architecture in training projects, organizing application requests, data, and views into a structured backend.",
    icon: Route,
    skills: ["Routing", "MVC Architecture", "Backend Development"],
  },
  {
    title: "Authentication & Backend Logic",
    description:
      "Practiced authentication and backend development through coursework and completed web development projects during my PNY Training under the NAVTEC program.",
    icon: ShieldCheck,
    skills: ["Authentication", "PHP Web Development", "Application Logic"],
  },
];

export const POSTS = [
  {
    title: "Architecting a Multi-Tenant SaaS with Node.js & React",
    excerpt:
      "Deep dive into handling secure tenant isolation, dynamic routing, and shared databases in a modern Node backend.",
    date: "Oct 15, 2026",
    readTime: "8 min read",
    category: "Architecture",
  },
  {
    title: "State Management in 2026: Beyond Redux",
    excerpt:
      "Exploring modern approaches to React state using Zustand, Context, and Server Components for optimal performance.",
    date: "Sep 28, 2026",
    readTime: "6 min read",
    category: "Frontend",
  },
  {
    title: "Database Strategies for Rapid App Prototypes",
    excerpt:
      "When launching an MVP, schema agility is key. This article details our shift towards using Document DBs like MongoDB early on for flexibility.",
    date: "Sep 05, 2026",
    readTime: "10 min read",
    category: "Database",
  },
];

export const FULL_POSTS = [
  {
    id: "multi-tenant-saas",
    title: "Architecting a Multi-Tenant SaaS with Node.js & React",
    content:
      "Building a multi-tenant application demands careful consideration of data isolation, security, and scalability. In this article, I discuss how we implemented separate collections in MongoDB to act as tenant silos, ensuring data integrity while keeping everything cost-effective. We matched this backend with a highly modular React frontend using role-based routing.",
    date: "Oct 15, 2026",
    readTime: "8 min read",
    category: "Architecture",
  },
  {
    id: "state-management",
    title: "State Management in 2026: Beyond Redux",
    content:
      "The days of boilerplate-heavy Redux are evolving. Based on recent projects, I outline migrating to leaner state solutions such as Zustand for global state alongside native React Context. This shift provided a massive reduction in frontend overhead, yielding faster initial load times and much happier team developers.",
    date: "Sep 28, 2026",
    readTime: "6 min read",
    category: "Frontend",
  },
  {
    id: "optimizing-sql",
    title: "Database Strategies for Rapid App Prototypes",
    content:
      "When launching an MVP, schema agility is key. This article details our shift towards using Document DBs like MongoDB early on for flexibility, while planning the eventual boundaries for migrating strict transactional records to a relational engine. Learn the hybrid approach to scale both start-up speed and enterprise reliability.",
    date: "Sep 05, 2026",
    readTime: "10 min read",
    category: "Database",
  },
];

export const SOCIALS = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/ahmad-ibrahim-aheer/",
    color:
      "hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ahmad-ibrahim-78385a326/",
    color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/ahmad_ibrahim_aheer/",
    color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10",
  },
  {
    name: "WhatsApp",
    icon: Phone,
    href: "https://wa.me/923086772082",
    color: "hover:text-[#25D366] hover:bg-[#25D366]/10",
  },
];
