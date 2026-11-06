import dotenv from "dotenv";
dotenv.config();
import type { Request, Response } from "express";
import { TopicModel } from "./topic.model.js";

import {
  getSystemPropmtForTopic,
  getUserPropmtForTopic,
} from "./topic.prompt.js";
import { getContentFromAi, PromptInterface } from "../ai/ai.service.js";

export async function createTopic(req: Request, res: Response) {
  try {
    const body = req.body;

    const count = await TopicModel.countDocuments({
      name: body.name.toLowerCase(),
    });
    if (count > 0) {
      throw new Error("Topic already exists");
    }

    const prompt: PromptInterface = {
      systemPrompt: getSystemPropmtForTopic(),
      userPrompt: getUserPropmtForTopic(body),
    };

    const response = await getContentFromAi(prompt);

    const payload = {
      level: body.level,
      language: body.language,
      ...JSON.parse(response),
    };

    const topic = await TopicModel.create(payload);
    res.status(201).json({
      message: "Topic created successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch topics:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch topics.",
      });
    }
  }
}

// import { GoogleGenAI, Type } from "@google/genai";

// const topics = [
//   // Programming Languages
//   "C",
//   "C#",
//   "Go",
//   "Javascript",
//   "Typescript",
//   "Go",
//   "Golang",
//   "Rust",
//   "Kotlin",
//   "Swift",
//   "PHP",
//   "Ruby",
//   "Dart",
//   "Scala",
//   "Perl",
//   "R Programming",
//   "SQL",
//   "MATLAB",
//   "Assembly Language",
//   "Lua",
//   "Elixir",
//   "Haskell",
//   "Objective-C",

//   // Software Development
//   "Software Development",
//   "Application Development",
//   "Enterprise Software",
//   "Software Architecture",
//   "Clean Code",
//   "Design Patterns",
//   "Object Oriented Programming",
//   "Functional Programming",
//   "Test Driven Development",
//   "Agile Development",
//   "Scrum",
//   "Code Review",
//   "Debugging",
//   "Version Control",
//   "Git",
//   "GitHub",
//   "GitLab",
//   "Bitbucket",
//   "Microservices",
//   "Monolithic Architecture",
//   "Event Driven Architecture",
//   "Serverless Computing",
//   "Distributed Systems",
//   "Scalable Applications",
//   "Performance Optimization",
//   "Software Testing",
//   "Quality Assurance",
//   "Unit Testing",
//   "Integration Testing",
//   "End-to-End Testing",

//   // Web Technologies
//   "HTML",
//   "CSS",
//   "Tailwind CSS",
//   "Bootstrap",
//   "Sass",
//   "Less",
//   "Webpack",
//   "Vite",
//   "Next.js",
//   "Nuxt.js",
//   "Angular",
//   "Vue.js",
//   "Svelte",
//   "Redux",
//   "Redux Toolkit",
//   "Zustand",
//   "React Native",
//   "Express.js",
//   "NestJS",
//   "Fastify",
//   "Django",
//   "Flask",
//   "FastAPI",
//   "Spring Boot",
//   "ASP.NET Core",
//   "REST API",
//   "GraphQL",
//   "WebSockets",
//   "Progressive Web Apps",
//   "Responsive Design",
//   "Server Side Rendering",
//   "Web Accessibility",

//   // Databases & Storage
//   "MongoDB",
//   "MySQL",
//   "PostgreSQL",
//   "Oracle Database",
//   "Microsoft SQL Server",
//   "SQLite",
//   "Redis",
//   "Elasticsearch",
//   "Firebase",
//   "Supabase",
//   "DynamoDB",
//   "Cassandra",
//   "Neo4j",
//   "Prisma ORM",
//   "Drizzle ORM",
//   "Mongoose",
//   "Data Modeling",
//   "Data Warehousing",
//   "ETL",
//   "Data Pipelines",

//   // Artificial Intelligence & Machine Learning
//   "Artificial Intelligence",
//   "Machine Learning",
//   "Deep Learning",
//   "Generative AI",
//   "Agentic AI",
//   "AI Agents",
//   "Large Language Models",
//   "LLM",
//   "LLM Applications",
//   "LLM Fine Tuning",
//   "Prompt Engineering",
//   "Retrieval Augmented Generation",
//   "RAG",
//   "Vector Databases",
//   "AI Chatbots",
//   "Conversational AI",
//   "Natural Language Processing",
//   "NLP",
//   "Computer Vision",
//   "Speech Recognition",
//   "Text To Speech",
//   "Reinforcement Learning",
//   "Supervised Learning",
//   "Unsupervised Learning",
//   "Transfer Learning",
//   "Neural Networks",
//   "Transformer Models",
//   "Diffusion Models",
//   "Multimodal AI",
//   "AI Model Training",
//   "AI Inference",
//   "AI Automation",
//   "AI Tools",
//   "AI Powered Applications",
//   "AI Infrastructure",
//   "MLOps",
//   "Machine Learning Operations",
//   "Hugging Face",
//   "LangChain",
//   "LangGraph",
//   "LlamaIndex",
//   "OpenAI API",
//   "Anthropic Claude",
//   "Google Gemini",
//   "PyTorch",
//   "TensorFlow",
//   "Scikit Learn",
//   "Keras",
//   "Jupyter Notebook",
//   "ML Model Deployment",

//   // Cloud Computing
//   "Amazon Web Services",
//   "AWS",
//   "Microsoft Azure",
//   "Google Cloud Platform",
//   "GCP",
//   "Cloud Architecture",
//   "Cloud Infrastructure",
//   "Cloud Security",
//   "Cloud Native",
//   "Cloud Migration",
//   "AWS Lambda",
//   "Amazon EC2",
//   "Amazon S3",
//   "AWS ECS",
//   "AWS EKS",
//   "Azure Functions",
//   "Google Cloud Run",
//   "Infrastructure As Code",
//   "Terraform",
//   "Pulumi",
//   "CloudFormation",

//   // DevOps & Infrastructure
//   "DevOps Engineering",
//   "Platform Engineering",
//   "Site Reliability Engineering",
//   "SRE",
//   "Docker",
//   "Kubernetes",
//   "Containerization",
//   "Jenkins",
//   "GitHub Actions",
//   "GitLab CI",
//   "CI/CD",
//   "Continuous Integration",
//   "Continuous Deployment",
//   "Ansible",
//   "Chef",
//   "Puppet",
//   "Prometheus",
//   "Grafana",
//   "Datadog",
//   "Logging",
//   "Monitoring",
//   "Observability",
//   "Nginx",
//   "Linux Administration",
//   "Shell Scripting",
//   "Bash",
//   "PowerShell",
//   "Networking",
//   "Load Balancing",

//   // Cybersecurity
//   "Information Security",
//   "Network Security",
//   "Application Security",
//   "Ethical Hacking",
//   "Penetration Testing",
//   "Vulnerability Assessment",
//   "Security Engineering",
//   "Cryptography",
//   "Encryption",
//   "Identity And Access Management",
//   "IAM",
//   "Zero Trust Security",
//   "DevSecOps",
//   "Threat Detection",
//   "Incident Response",
//   "OWASP",
//   "SOC",
//   "SIEM",
//   "Digital Forensics",

//   // Data Science & Analytics
//   "Data Science",
//   "Data Analytics",
//   "Business Intelligence",
//   "Statistical Analysis",
//   "Predictive Analytics",
//   "Data Visualization",
//   "Power BI",
//   "Tableau",
//   "Apache Spark",
//   "Apache Hadoop",
//   "Apache Kafka",
//   "Apache Airflow",
//   "Pandas",
//   "NumPy",
//   "Matplotlib",
//   "Data Engineering",
//   "Data Mining",
//   "Time Series Analysis",

//   // Emerging Technologies
//   "Blockchain Technology",
//   "Web3",
//   "Smart Contracts",
//   "Ethereum",
//   "Solidity",
//   "Cryptocurrency",
//   "Internet Of Things",
//   "IoT",
//   "Edge Computing",
//   "Quantum Computing",
//   "Augmented Reality",
//   "AR",
//   "Virtual Reality",
//   "VR",
//   "Extended Reality",
//   "XR",
//   "Digital Twins",
//   "Autonomous Systems",
//   "Self Driving Cars",
//   "Embedded Systems",
//   "5G Technology",
//   "Green Computing",

//   // Career & Industry
//   "Tech Careers",
//   "Software Engineer",
//   "Software Developer",
//   "Frontend Developer",
//   "Backend Developer",
//   "Full Stack Developer",
//   "AI Engineer",
//   "Machine Learning Engineer",
//   "Data Engineer",
//   "Cloud Engineer",
//   "DevOps Engineer",
//   "System Architect",
//   "Technical Interview",
//   "Coding Interview",
//   "Tech Interview Preparation",
//   "Competitive Programming",
//   "Hackathon",
//   "Tech Startups",
//   "Engineering Best Practices",
//   "Open Source Projects",
//   "Developer Tools",
//   "Tech News",
//   "Technology Trends",
// ];

// export async function createTopic(req: Request, res: Response) {
//   try {
//     // if (topics.includes(req.body.topic)) {
//     //   res.json({ isValid: true, message: "Topic is Valid" });
//     //   return;
//     // }
//     // const ai = new GoogleGenAI({
//     //   apiKey: process.env.GEMINI_KEY!,
//     // });
//     // const prompt = `
//     //   System:
//     //     Role:
//     //       Your are topic validator AI
//     //     Job:
//     //       Check Topic is suitable for teaching or not
//     //     Accept:
//     //       - Programming langauge
//     //       - Coding
//     //       - Information Technology
//     //       - Software
//     //       - AI
//     //       - Machine learning
//     //     Reject:
//     //       - Reject everything else
//     //     Examples:
//     //        topic: "React"
//     //        output: {"isValid": true, "message":"Topic is Valid"}
//     //        topic: "sdada"
//     //        output: {"isValid": false, "message":"Topic is Invalid"}
//     //        topic: "noun"
//     //        output: {"isValid": false, "message":"Topic is Invalid"}
//     //   Topic:
//     //   ${req.body.topic}
//     // `;
//     // const result = await ai.models.generateContent({
//     //   model: process.env.GEMINI_MODEL!,
//     //   contents: prompt,
//     //   config: {
//     //     responseMimeType: "application/json",
//     //     responseSchema: {
//     //       type: Type.OBJECT,
//     //       properties: {
//     //         isValid: { type: Type.BOOLEAN },
//     //         message: { type: Type.STRING },
//     //       },
//     //       required: ["isValid", "message"],
//     //     },
//     //   },
//     // });
//     // res.send(result.text);
//     // const topic = await Topic.create(req.body);
//     // res.status(201).json({
//     //   message: "Topic created successfully.",
//     //   data: topic,
//     // });

//
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Failed to create topic:", error);
//       res.status(500).json({
//         message: error.message || "Failed to create topic.",
//       });
//     }
//   }
// }

export async function fetchTopics(_req: Request, res: Response) {
  try {
    const topics = await TopicModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Topics fetched successfully.",
      data: topics,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch topics:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch topics.",
      });
    }
  }
}

export async function fetchTopicById(req: Request, res: Response) {
  try {
    const topic = await TopicModel.findById(req.params.id);

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic fetched successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch topic:", error);
      res.status(500).json({
        message: error.message || "Failed to fetch topic.",
      });
    }
  }
}

export async function updateTopic(req: Request, res: Response) {
  try {
    const topic = await TopicModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic updated successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to update topic:", error);
      res.status(500).json({
        message: error.message || "Failed to update topic.",
      });
    }
  }
}

export async function deleteTopic(req: Request, res: Response) {
  try {
    const topic = await TopicModel.findByIdAndDelete(req.params.id);

    if (!topic) {
      throw new Error("Topic not found.");
    }

    res.status(200).json({
      message: "Topic deleted successfully.",
      data: topic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to delete topic:", error);
      res.status(500).json({
        message: error.message || "Failed to delete topic.",
      });
    }
  }
}
