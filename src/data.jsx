import { title } from "framer-motion/client";
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

import { 
  SiReact, 
  SiFlutter, 
  SiLaravel, 
  SiDjango, 
  SiNodedotjs, 
  SiWebgl,
} from 'react-icons/si';

const skills_list = [
    { name: "React.js", level: 85, icon: SiReact },
    { name: "Flutter", level: 90, icon: SiFlutter },
    { name: "Laravel", level: 95, icon: SiLaravel },
    { name: "Django", level: 90, icon: SiDjango },
    { name: "Node.js", level: 90, icon: SiNodedotjs },
    { name: "WebGL", level: 80, icon: SiWebgl }
  ];

const canvasSettings = {
  background: "#dfdfdf",
  physics: {
    gravity: [0, -9.81, 0], 
    iterations: 30
  },
  camera: {
    position: [0, 0, 20],
    fov: 35,
    near: 4,
    far: 40
  },
  lighting: {
    ambient: {
      intensity: 0.5
    },
    spot: {
      intensity: 1,
      angle: 0.2,
      penumbra: 1,
      position: [30, 30, 30],
      shadowMapSize: [512, 512]
    }
  },
  effects: {
    ao: {
      halfRes: true,
      color: "black",
      aoRadius: 2,
      intensity: 1,
      aoSamples: 6,
      denoiseSamples: 4
    },
    bloom: {
      mipmapBlur: true,
      levels: 7,
      intensity: 1
    }
  }
};

const ballsConfig = {
  count: 40,
  size: 1,
  mass: 1,
  angularDamping: 0.1,
  linearDamping: 0.65,
  forceMultiplier: -40,
  initialSpread: 20
};

const projects = [
  {
    id: 1,
    title: "my portfolio",
    description: "A modern, interactive portfolio website built with React and Three.js.",
    image: "./pro1.png",
    technologies: [
      "React",
      "Three.js",
      "Framer Motion",
      "Styled Components",
      "WebGL",
      "Responsive Design"
    ],
    liveLink: "https://incalacode.github.io/porfolio/",
    githubLink: "https://github.com/IncalaCode/porfolio",
    category: "Frontend Development"
  },
  {
    id: 2,
    title: "QuenGen",
    description: "QenGen is a versatile platform for generating quiz or  questions from PDF, DOCX, and PPT documents.",
    image: "https://incalacode.github.io/google_project/img/img1.png",
    technologies: ["Html", "Tailwind CSS", "JavaScript","supabase","gemine ai"],
    liveLink: "https://incalacode.github.io/google_project/",
    githubLink: "https://github.com/IncalaCode/google_project",
    category: "Frontend Development"
  },
  {
    id: 3,
    title: "Instruction Repository System",
    description: "A comprehensive IR System designed to efficiently manage and retrieve.\"privet project\"",
    image: "./pro3.png",
    technologies: [
      "React",
      "Django",
      "SQLite",
      "Tailwind CSS",
      "Python",
      "JavaScript"
    ],
    liveLink: "https://project2.com",
    githubLink: "https://github.com/IncalaCode/",
    category: "fullstack Development"
  },
  
  // Add more projects as needed here 
];

const socialLinks =    [ {
  icon: <FaGithub />,
  url: "https://github.com/IncalaCode",
  label: "GitHub"
},
{
  icon: <FaLinkedin />,
  url: "https://linkedin.com/in/kaleb adem kisho",
  label: "LinkedIn"
},
{
  icon: <FaYoutube />,
  url: "https://youtube.com/c/kaleb adem kisho",
  label: "YouTube"
}
]


const layout = {
  hero: {
    title: "Kaleb Adem",
    subtitle: "Full-Stack & Smart Agent Developer",
    quote: "Transforming ideas into elegant code, one line at a time.",
    avatar: "./photo_2025-03-09_11-18-42.jpg"
  },
  projects: {
    title: "Featured Projects",
    items: projects,
    // filters: ["All", "Web Development", "Frontend Development", "Backend Development"] // Optional for future use use with filter buttons
  },
  skills: {
    frontend: ["React", "Next.js", "Three.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "Firebase"],
    tools: ["Git", "Docker", "AWS", "Figma"]
  },
  contact: {
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername"
  },
  canvas: canvasSettings,
  balls: ballsConfig,
  socialLinks,
  skills_list
};

export default layout;