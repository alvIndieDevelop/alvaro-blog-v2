import { Code2, Database, Server, Globe, Cpu, Cloud, Terminal, Braces } from 'lucide-react';
import type { SkillCategory } from './types';

export const skillTreeData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      {
        id: 'react',
        name: 'React',
        level: 5,
        maxLevel: 5,
        description: 'Advanced component architecture and state management',
        icon: Code2,
        unlocks: ['nextjs'],
        experience: 95,
        nextLevelExp: 100,
        effects: ['Component Architecture', 'State Management', 'Performance Optimization']
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        level: 4,
        maxLevel: 5,
        description: 'Full-stack React framework expertise',
        icon: Globe,
        requires: ['react'],
        experience: 80,
        nextLevelExp: 100,
        effects: ['Server Components', 'API Routes', 'Static Generation']
      }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      {
        id: 'express',
        name: 'Express.js',
        level: 4,
        maxLevel: 5,
        description: 'RESTful API development with Express',
        icon: Server,
        experience: 85,
        nextLevelExp: 100,
        effects: ['API Design', 'Middleware', 'Error Handling']
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        level: 3,
        maxLevel: 5,
        description: 'Enterprise Node.js framework',
        icon: Terminal,
        requires: ['typescript'],
        experience: 70,
        nextLevelExp: 100,
        effects: ['Dependency Injection', 'Modules', 'Decorators']
      }
    ]
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    skills: [
      {
        id: 'javascript',
        name: 'JavaScript',
        level: 5,
        maxLevel: 5,
        description: 'Core language mastery',
        icon: Braces,
        unlocks: ['typescript'],
        experience: 98,
        nextLevelExp: 100,
        effects: ['ES6+', 'Async Programming', 'Functional Programming']
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        level: 4,
        maxLevel: 5,
        description: 'Static typing and advanced patterns',
        icon: Braces,
        requires: ['javascript'],
        experience: 85,
        nextLevelExp: 100,
        effects: ['Type System', 'Generics', 'Decorators']
      },
      {
        id: 'python',
        name: 'Python',
        level: 3,
        maxLevel: 5,
        description: 'Scripting and automation',
        icon: Braces,
        experience: 65,
        nextLevelExp: 100,
        effects: ['Data Processing', 'Automation', 'Web Scraping']
      },
      {
        id: 'csharp',
        name: 'C#',
        level: 3,
        maxLevel: 5,
        description: '.NET development',
        icon: Braces,
        experience: 60,
        nextLevelExp: 100,
        effects: ['.NET Core', 'LINQ', 'Entity Framework']
      }
    ]
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    skills: [
      {
        id: 'lambda',
        name: 'Lambda',
        level: 3,
        maxLevel: 5,
        description: 'Serverless computing',
        icon: Cloud,
        experience: 70,
        nextLevelExp: 100,
        effects: ['Serverless', 'Event-Driven', 'API Gateway']
      },
      {
        id: 'amplify',
        name: 'Amplify',
        level: 3,
        maxLevel: 5,
        description: 'Full-stack development platform',
        icon: Cloud,
        experience: 65,
        nextLevelExp: 100,
        effects: ['Authentication', 'API', 'Hosting']
      },
      {
        id: 'ec2',
        name: 'EC2',
        level: 4,
        maxLevel: 5,
        description: 'Virtual server management',
        icon: Cloud,
        experience: 75,
        nextLevelExp: 100,
        effects: ['Server Management', 'Auto Scaling', 'Load Balancing']
      }
    ]
  },
  {
    id: 'databases',
    name: 'Databases',
    skills: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        level: 4,
        maxLevel: 5,
        description: 'NoSQL database expertise',
        icon: Database,
        experience: 80,
        nextLevelExp: 100,
        effects: ['Schema Design', 'Aggregation', 'Indexing']
      },
      {
        id: 'mariadb',
        name: 'MariaDB',
        level: 3,
        maxLevel: 5,
        description: 'Relational database management',
        icon: Database,
        experience: 65,
        nextLevelExp: 100,
        effects: ['SQL', 'Optimization', 'Replication']
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        level: 4,
        maxLevel: 5,
        description: 'Advanced relational database',
        icon: Database,
        experience: 85,
        nextLevelExp: 100,
        effects: ['Complex Queries', 'JSON Support', 'Full-Text Search']
      },
      {
        id: 'redis',
        name: 'Redis',
        level: 3,
        maxLevel: 5,
        description: 'In-memory data structure store',
        icon: Database,
        experience: 70,
        nextLevelExp: 100,
        effects: ['Caching', 'Pub/Sub', 'Data Structures']
      }
    ]
  }
];