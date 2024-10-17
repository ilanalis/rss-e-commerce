import { MemberCardProps } from '@pages/about-us/components/member-card';

import MariiaAvatar from '@assets/mariia.jpg';
import IlanaAvatar from '@assets/iliana.jpg';
import DmitriyAvatar from '@assets/dmitriy.jpg';

export const membersData: MemberCardProps[] = [
  {
    title: 'Mariia Donskaia',
    link: 'https://github.com/dma117',
    role: 'Developer',
    imgSrc: MariiaAvatar,
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
    role: 'Team lead/Developer',
    imgSrc: IlanaAvatar,
    contributionList: [
      'Commercetools API integration',
      'Profile page implementation',
      'Cart page implementation',
      'React Context API integration',
      'Task board setup and its management',
      'Deploy setup and its management',
      'Commercetools setup',
      'Design in figma customization',
    ],
  },
  {
    title: 'Dmitriy Salangin',
    link: 'https://github.com/dma117',
    role: 'Developer',
    imgSrc: DmitriyAvatar,
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
    title: 'Clear Communication',
    description:
      'Tools like Telegram, Google Meet, and JIRA were utilized to keep track of progress and address any issues promptly',
  },
  {
    title: 'Mutual Respect and Trust',
    description: 'A culture of mutual respect and trust was cultivated within the team',
  },
  {
    title: 'Flexibility and Adaptability',
    description: 'The team remained flexible and adaptable throughout the project',
  },
  {
    title: 'Defined Roles and Responsibilities',
    description: 'Each team member had a clear understanding of their roles and responsibilities',
  },
];
