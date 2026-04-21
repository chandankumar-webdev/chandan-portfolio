/** Google Maps · Sector 49, Gurugram (office area) */
export const PROFILE_MAPS_URL =
  "https://www.google.com/maps/place/Sector+49,+Gurugram,+Haryana+122018/@28.4111857,77.0393729,15z/data=!3m1!4b1!4m6!3m5!1s0x390d228f446b3881:0x9d798b7f0e65fcbc!8m2!3d28.4121197!4d77.048024!16s%2Fg%2F1tdk8g5d?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D";

export const social = {
  linkedin: "https://www.linkedin.com/in/chandankumar-webdev/",
  github: "https://github.com/chandankumar-webdev",
  email: "mailto:chandankumar.webdev@gmail.com",
  gmailWeb:
    "https://mail.google.com/mail/?view=cm&fs=1&to=chandankumar.webdev@gmail.com&su=Hello%20Chandan",
  phone: "tel:+918860503220",
} as const;

/**
 * PDF in /public — replace the file when your resume updates.
 * Put your live portfolio URL in your resume/PDF with `?source=resume` (e.g. `https://yoursite.com/?source=resume`)
 * so the welcome modal uses the resume-specific message.
 */
export const resume = {
  href: "/Chandan_FullStack_FrontEnd_Resume.pdf",
  downloadFileName: "Chandan_FullStack_FrontEnd_Resume.pdf",
} as const;

export const profile = {
  name: "Chandan Kumar",
  title: "Sr. Software Engineer · Front-end · Full-stack",
  location: "Sector 49, Gurugram, India",
  mapsUrl: PROFILE_MAPS_URL,
  /** Hero / OG image */
  photoSrc: "/profile.png",
  summary:
    "Results-driven developer with 5 years of experience building dynamic web applications using React, Vue, Node, and modern JavaScript. Strong problem-solving, leadership, and mentoring, with a focus on performance and high-quality delivery.",
};

export type ExperienceLink = {
  label: string;
  url: string;
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
    links: [
      {
        label: "FieldAssist on LinkedIn",
        url: "https://www.linkedin.com/company/fieldassist/posts/?feedView=all",
      },
      {
        label: "FieldAssist DMS · Product",
        url: "https://fieldassist.com/online-distributor-management-system/",
      },
    ] satisfies ExperienceLink[],
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
    links: [
      {
        label: "Nityo Infotech on LinkedIn",
        url: "https://www.linkedin.com/company/nityo-infotech/posts/?feedView=all",
      },
      {
        label: "Samsung SDS · SingleID",
        url:
          "https://www.samsungsds.com/en/security-secure-identity-access/security-secure-identity-access-management.html",
      },
    ] satisfies ExperienceLink[],
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
    links: [
      {
        label: "Innostax on LinkedIn",
        url: "https://www.linkedin.com/company/innostax/posts/?feedView=all",
      },
      {
        label: "TAVA · Privacy Dynamics",
        url: "https://tava.cloud/",
      },
    ] satisfies ExperienceLink[],
  },
];

export const projects = [
  {
    name: "DMS (Distributor Management System)",
    description:
      "Mobile and web platform for CPG/FMCG brands to digitize sales, inventory, and distribution with analytics.",
    url: "https://fieldassist.com/online-distributor-management-system/",
  },
  {
    name: "Single ID",
    description:
      "Security-focused access management: anomaly detection and account tracking (Samsung SDS).",
    url:
      "https://www.samsungsds.com/en/security-secure-identity-access/security-secure-identity-access-management.html",
  },
  {
    name: "TAVA App · Privacy Dynamics",
    description:
      "Streamlining online presence and anonymizing data for engineers using modern data stacks.",
    url: "https://tava.cloud/",
  },
];

export const skills = {
  frontend: ["React", "Vue", "JavaScript", "TypeScript", "Redux", "Vuex", "Tailwind", "HTML", "CSS"],
  backend: ["Node", "Express", "SQL", "NoSQL"],
  tools: ["Git", "Jest", "Cypress", "Cursor AI", "VS Code", "Storybook"],
};

export const courses = [
  {
    label: "LLD & HLD",
    title: "System Design from Basics to Advanced",
    url: "https://ude.my/UC-df49dd64-ac8b-4894-ae3e-c50c49f45100",
  },
  {
    label: "Node.js",
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    /** Completion certificate (PDF) for the Node bootcamp */
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-de410411-0235-4667-90fa-eba97530c4a0.pdf",
  },
];

export const education = {
  degree: "B.Tech (Computer Science & Engineering)",
  school: "Galgotias University",
  location: "Greater Noida, UP, India",
  period: "Sep 2016 – Sep 2020",
  /** Official university site */
  url: "https://www.galgotiasuniversity.edu.in/",
};

export type ImportantLinkItem = {
  title: string;
  subtitle?: string;
  url: string;
  /** Used with Google favicon API for preview tile */
  previewDomain: string;
  accent: string;
};

/** Curated shortcuts — favicon “preview” tiles use previewDomain */
export const importantLinks = [
  {
    title: "Email",
    subtitle: "chandankumar.webdev@gmail.com",
    url: "mailto:chandankumar.webdev@gmail.com",
    previewDomain: "mail.google.com",
    accent: "from-rose-950/90 via-surface to-surface",
  },
  {
    title: "LinkedIn",
    subtitle: "Profile",
    url: "https://www.linkedin.com/in/chandankumar-webdev/",
    previewDomain: "linkedin.com",
    accent: "from-[#0a66c2]/35 via-surface to-surface",
  },
  {
    title: "GitHub",
    subtitle: "chandankumar-webdev",
    url: "https://github.com/chandankumar-webdev",
    previewDomain: "github.com",
    accent: "from-neutral-900 via-surface to-surface",
  },
  {
    title: "FieldAssist",
    subtitle: "Company · LinkedIn",
    url: "https://www.linkedin.com/company/fieldassist/posts/?feedView=all",
    previewDomain: "linkedin.com",
    accent: "from-emerald-950/80 via-surface to-surface",
  },
  {
    title: "FieldAssist DMS",
    subtitle: "Product overview",
    url: "https://fieldassist.com/online-distributor-management-system/",
    previewDomain: "fieldassist.com",
    accent: "from-teal-950/70 via-surface to-surface",
  },
  {
    title: "Nityo Infotech",
    subtitle: "Company · LinkedIn",
    url: "https://www.linkedin.com/company/nityo-infotech/posts/?feedView=all",
    previewDomain: "linkedin.com",
    accent: "from-blue-950/70 via-surface to-surface",
  },
  {
    title: "Innostax",
    subtitle: "Company · LinkedIn",
    url: "https://www.linkedin.com/company/innostax/posts/?feedView=all",
    previewDomain: "linkedin.com",
    accent: "from-indigo-950/70 via-surface to-surface",
  },
  {
    title: "TAVA",
    subtitle: "Privacy Dynamics · Cloud",
    url: "https://tava.cloud/",
    previewDomain: "tava.cloud",
    accent: "from-cyan-950/70 via-surface to-surface",
  },
  {
    title: "Samsung SDS · SingleID",
    subtitle: "Identity & access",
    url:
      "https://www.samsungsds.com/en/security-secure-identity-access/security-secure-identity-access-management.html",
    previewDomain: "samsungsds.com",
    accent: "from-blue-950/90 via-surface to-surface",
  },
  {
    title: "Udemy · System design",
    subtitle: "LLD & HLD course",
    url: "https://ude.my/UC-df49dd64-ac8b-4894-ae3e-c50c49f45100",
    previewDomain: "udemy.com",
    accent: "from-purple-950/70 via-surface to-surface",
  },
  {
    title: "Udemy · Node.js",
    subtitle: "Bootcamp certificate (PDF)",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-de410411-0235-4667-90fa-eba97530c4a0.pdf",
    previewDomain: "udemy.com",
    accent: "from-violet-950/70 via-surface to-surface",
  },
  {
    title: "Galgotias University",
    subtitle: "College",
    url: "https://www.galgotiasuniversity.edu.in/",
    previewDomain: "galgotiasuniversity.edu.in",
    accent: "from-orange-950/60 via-surface to-surface",
  },
  {
    title: "Sector 49 · Gurugram",
    subtitle: "Maps · Office area",
    url: PROFILE_MAPS_URL,
    previewDomain: "google.com",
    accent: "from-green-950/60 via-surface to-surface",
  },
] satisfies ImportantLinkItem[];

export const languages = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional" },
];
