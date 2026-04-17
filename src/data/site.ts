/** Set your real LinkedIn / GitHub URLs here. */
export const social = {
  linkedin: "https://www.linkedin.com/in/YOUR-LINKEDIN-ID",
  github: "https://github.com/YOUR-GITHUB-USERNAME",
  email: "mailto:chandankumar.webdev@gmail.com",
  phone: "tel:+918860503220",
} as const;

export const profile = {
  name: "Chandan Kumar",
  title: "Sr. Software Engineer · Front-end · Full-stack",
  location: "Gurugram, India",
  summary:
    "Results-driven developer with 5 years of experience building dynamic web applications using React, Vue, Node, and modern JavaScript. Strong problem-solving, leadership, and mentoring, with a focus on performance and high-quality delivery.",
};

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Fieldassist",
    location: "Gurugram, India",
    period: "Feb 2024 – Present",
    highlights: [
      "Spearheading full-stack work on the Distributor Management System (DMS): invoices, orders, inventory, and ledger at enterprise scale.",
      "Shipped modules for RBAC, translation, and target & achievement.",
      "Contributed ~40% to backend work: APIs, caching, queues, microservices, SQL/NoSQL.",
      "Implemented barcode scanning and virtual inventory, improving efficiency by ~60%.",
      "Introduced Storybook for UI testing; used AI tools such as Cursor and Windsurf.",
      "Acted as Scrum Master: sprint planning and backlog grooming.",
      "Mentored backend developers on front-end practices and led PR reviews.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Nityo Infotech",
    location: "Gurugram, India",
    period: "Jul 2023 – Oct 2023",
    highlights: [
      "Led technical training and mentorship for 3 junior developers on the Samsung SDS SingleID project.",
      "Optimized application performance (~10% load time improvement).",
      "Delivered 10+ production-ready features; helped accelerate release cycles by ~15%.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Innostax Software Labs",
    location: "Gurugram, India",
    period: "Apr 2021 – Jun 2023",
    highlights: [
      "Led a team of 2 developers.",
      "Upgraded an application from Vue 2 to Vue 3.",
      "Optimized front-end code and reusable UI components for responsiveness.",
      "Implemented Cypress tests, reducing front-end bugs by ~40%.",
      "Designed and deployed REST APIs with SQL integration; improved back-end response times by ~20%.",
    ],
  },
];

export const projects = [
  {
    name: "DMS (Distributor Management System)",
    description:
      "Mobile and web platform for CPG/FMCG brands to digitize sales, inventory, and distribution with analytics.",
  },
  {
    name: "Single ID",
    description:
      "Security-focused access management: anomaly detection and account tracking (Samsung SDS).",
  },
  {
    name: "TAVA App · Privacy Dynamics",
    description:
      "Streamlining online presence and anonymizing data for engineers using modern data stacks.",
  },
];

export const skills = {
  frontend: ["React", "Vue", "JavaScript", "TypeScript", "Redux", "Vuex", "Tailwind", "HTML", "CSS"],
  backend: ["Node", "Express", "SQL", "NoSQL"],
  tools: ["Git", "Jest", "Cypress", "Cursor AI", "VS Code", "Storybook"],
};

export const courses = [
  {
    label: "Node.js",
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    url: "#",
  },
  {
    label: "LLD & HLD",
    title: "System Design from Basics to Advanced",
    url: "#",
  },
];

export const education = {
  degree: "B.Tech (Computer Science & Engineering)",
  school: "Galgotias University",
  location: "Greater Noida, UP, India",
  period: "Sep 2016 – Sep 2020",
};

export const languages = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional" },
];
