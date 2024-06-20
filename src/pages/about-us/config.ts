import { MemberCardProps } from '@pages/about-us/components/member-card';

import MariiaAvatar from '@assets/mariia.jpg';
import IlanaAvatar from '@assets/iliana.jpg';
import DmitriyAvatar from '@assets/dmitriy.jpg';

export const membersData: MemberCardProps[] = [
  {
    title: 'Mariia Donskaia',
    link: 'https://github.com/dma117',
    role: 'Frontend developer',
    imgSrc: MariiaAvatar,
    bio: "I’m a recent Applied Mathematics and Computer Science graduate. I'm responsible, friendly and inquisitive. I lead an active, healthy lifestyle: I go swimming and go to the gym. I'm also learning English.  At the moment, I'm intensively studying all aspects of frontend development, from basic technologies: JavaScript, HTML, CSS, to more advanced and ubiquitous ones: TypeScript, React, Redux. I want to do real frontend development cases, improve my skills, and plan to get a job soon.",
    contributionList: [
      'Repository setup',
      'Environment configuration setup and its management',
      'Login and registration forms implementation',
      'Validation methods testing',
      'Detailed Product Page implementation',
      'About us Page implementation',
    ],
  },
  {
    title: 'Iliana Lipkina',
    link: 'https://github.com/ilanalis',
    role: 'Team lead',
    imgSrc: IlanaAvatar,
    bio: 'I am currently a student at RSS School, with a strong interest about web technology and design. I aim to become a front-end developer soon.  I like contemplating how to make websites more convenient and understandable for users, noting innovative solutions on various sites, eager to implement these inspirations into my own projects. My stack includes JavaScript, TypeScript, React, HTML, CSS, SCSS, and Git.',
    contributionList: [
      'Task board setup and its management',
      'Deploy setup and its management',
      'Commercetools setup',
      'Commercetools API integration',
      'Design in figma customization',
      'Profile page implementation',
      'Cart page implementation',
      'React Context API integration',
    ],
  },
  {
    title: 'Dmitriy Salangin',
    link: 'https://github.com/dma117',
    role: 'Frontend developer',
    imgSrc: DmitriyAvatar,
    bio: 'I work as a front-end developer, and the RSS School greatly helps me enhance my skills and learn many new things. I enjoy thinking about how to make websites more user-friendly and intuitive, identifying innovative solutions on various platforms, and striving to implement these ideas in my projects. My tech stack includes JavaScript, TypeScript, React, HTML, CSS, SCSS, Git.',
    contributionList: [
      'Scripts development and readme providing',
      'Customization of design in Figma',
      'Routing configuration',
      'Header implementation',
      'Catalog Page implementation',
      'Compiling a list of products and exporting them to commerce-tools',
    ],
  },
];

export const collaborationList = [
  {
    title: 'Clear Communication 📞',
    description:
      'Tools like Telegram, Google Meet, and JIRA were utilized to keep track of progress and address any issues promptly',
  },
  {
    title: 'Mutual Respect and Trust 🙌',
    description: 'A culture of mutual respect and trust was cultivated within the team',
  },
  {
    title: 'Flexibility and Adaptability 🔄',
    description: 'The team remained flexible and adaptable throughout the project',
  },
  {
    title: 'Defined Roles and Responsibilities 📝',
    description: 'Each team member had a clear understanding of their roles and responsibilities',
  },
];
