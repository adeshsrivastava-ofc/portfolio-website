export const siteConfig = {
  name: "Adesh Srivastava",
  title: "Senior Software Developer",
  description:
    "Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation. Specializing in Java, Spring Boot, and modern DevOps practices.",
  url: "https://mrshady.dev",
  email: "adeshsrivastava.ofc@gmail.com",
  phone: "+91 8319613234",
  location: "Pune, Maharashtra, India",
  links: {
    linkedin: "https://linkedin.com/in/adeshsrivastava-ofc",
    github: "https://github.com/adeshsrivastava-ofc",
    twitter: "https://x.com/adesh_ofc",
    leetcode: "https://leetcode.com/u/AdeshSrivastava",
    hackerrank: "https://hackerrank.com/profile/adeshsrivastava",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const aboutData = {
  headline: "Building Scalable Solutions, One Line at a Time",
  summary: `Senior Software Developer with 3+ years of experience in Full-Stack Development, Big Data Solutions, and Automation. I specialize in Java, PL/SQL, Linux, and modern cloud technologies, with a proven track record of delivering end-to-end automation across 15+ enterprise projects.`,
  description: `I've worked extensively in client-facing and decision-making roles, collaborating with cross-functional teams at Infosys to deliver high-impact software solutions for CVS Healthcare across 22+ US states. My expertise spans designing 80+ data workflows, optimizing BTEQ queries for 40% faster response times, and building robust testing frameworks that reduced production defects by 80%.

Currently expanding my expertise in AWS, DevSecOps pipelines, and modern frontend technologies like React and Next.js. Passionate about creating scalable, optimized, and dependable (S.O.L.I.D.) products.`,
  values: [
    "Clean, maintainable code",
    "Performance-first architecture",
    "Continuous learning mindset",
    "Collaborative problem-solving",
  ],
  funFacts: [
    "Photography enthusiast",
    "Technical writing",
    "Exploring new destinations",
  ],
} as const;

export const experienceData = [
  {
    title: "Senior Software Developer",
    company: "Infosys",
    location: "India",
    period: "March 2021 – December 2023",
    description:
      "Led Big Data solutions and automation initiatives for CVS Healthcare, managing projects across 22+ US states with a focus on ETL workflows and system optimization.",
    achievements: [
      {
        metric: "80+",
        label: "Data workflows designed using Informatica and PL/SQL for ETL operations",
      },
      {
        metric: "50%",
        label: "Reduction in manual effort through Unix shell script automation",
      },
      {
        metric: "40%",
        label: "Faster query response times via BTEQ optimization",
      },
      {
        metric: "2x",
        label: "Scalability improvement in data workflows, enabling 150% transaction growth",
      },
      {
        metric: "80%",
        label: "Reduction in production defects through robust testing framework",
      },
      {
        metric: "15+",
        label: "Projects integrated across cross-functional teams",
      },
    ],
    responsibilities: [
      "Designed and implemented ETL pipelines using Informatica PowerCenter and PL/SQL",
      "Developed Unix shell scripts for data processing and system administration automation",
      "Optimized BTEQ queries and data models for high-volume data ingestion",
      "Led integration of system modules across product, engineering, and support teams",
      "Mentored junior developers on big data systems and best practices",
      "Managed daily client communications with 6+ business partners",
    ],
    technologies: [
      "Java",
      "PL/SQL",
      "Informatica PowerCenter",
      "Teradata BTEQ",
      "Shell Scripting",
      "Linux",
      "Git",
    ],
  },
] as const;

export const projectsData = [
  {
    title: "FindingNemo",
    subtitle: "Tour Booking Management System",
    description:
      "A comprehensive tour booking management system built with Java 8 features to accelerate code performance. Leverages modern Java paradigms for efficient data processing and business intelligence.",
    impact: [
      "Reduced data handling time by 50% using Java Streams API",
      "Met 90%+ of business requirements through intelligent statistics generation",
      "Reduced crash rates by 80% through thorough testing and debugging",
    ],
    technologies: ["Java 8", "Collection Framework", "Stream API", "JUnit", "Maven"],
    type: "Enterprise Application",
    link: "https://github.com/adeshsrivastava-ofc",
  },
  {
    title: "SamaDhaan",
    subtitle: "Community Helper Portal",
    description:
      "A one-stop community-helper multipurpose web portal designed to solve 25+ critical problems. Educates users about Government Schemes and simplifies access to professional home services.",
    impact: [
      "Benefited 70% of job seekers through Government Scheme education",
      "Optimized resources by 50% using Docker containerization",
      "Aimed to increase employment opportunities and reduce poverty",
    ],
    technologies: ["React.js", "CodeIgniter", "PHP", "MySQL", "Docker", "REST APIs"],
    type: "Social Impact",
    link: "https://github.com/adeshsrivastava-ofc",
  },
] as const;

export const skillsData = {
  categories: [
    {
      title: "Programming Languages",
      skills: ["Java", "TypeScript", "JavaScript", "Shell Scripting"],
    },
    {
      title: "Backend & APIs",
      skills: [
        "Spring Boot",
        "Spring Data JPA",
        "Node.js",
        "Express.js",
        "Bun.js",
        "RESTful APIs",
      ],
    },
    {
      title: "Frontend & UI",
      skills: [
        "React",
        "Next.js",
        "Vite.js",
        "Tailwind CSS",
        "shadcn/ui",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Databases & ETL",
      skills: [
        "MySQL",
        "PL/SQL",
        "Teradata BTEQ",
        "Informatica PowerCenter",
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "Terraform",
        "Ansible",
        "Linux",
      ],
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "Postman", "IntelliJ IDEA", "VS Code", "Warp"],
    },
  ],
} as const;

export const achievementsData = [
  {
    title: "InstaAward at Infosys",
    description:
      "Recognized for handling end-to-end automation across 15+ projects, driving operational efficiency for CVS Healthcare.",
    icon: "award",
  },
  {
    title: "Highest Academic Distinction",
    description:
      "Secured 1st rank in B.E. Computer Science with 9.6 SGPA.",
    icon: "graduation",
  },
  {
    title: "Microsoft Office Specialist",
    description:
      "Gold medal winner in Microsoft Compudon competition.",
    icon: "medal",
  },
] as const;

export const educationData = {
  degree: "Bachelor of Engineering in Computer Science",
  institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
  period: "August 2016 – July 2020",
  achievement: "1st Rank with 9.6 SGPA",
} as const;
