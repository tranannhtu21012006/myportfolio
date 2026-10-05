export type Project = {
  id: number;
  key: string;
  category: 'Work' | 'Personal' | 'Academic';
  date: string;
  teamSize: number;
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
};

export const PROJECT_DATA: Project[] = [
  {
    id: 4,
    key: 'ueh-network',
    category: 'Academic',
    date: 'Oct 2025 - Nov 2025',
    teamSize: 6,
    techStack: ['Cisco Packet Tracer'],
    image: '/uehN.png',
    demoUrl: '#',
    githubUrl: 'https://drive.google.com/drive/folders/1QKB8rFR5oQTgjxauSbFya-FS_W0ds1ZP?usp=sharing'
  },
  {
    id: 1,
    key: 'dijkstra',
    category: 'Academic',
    date: 'Apr 2025 - May 2025',
    teamSize: 4,
    techStack: ['C#', 'WinForms', '.NET', 'Dijkstra'],
    image: '/dijkstra.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006/CTDL_GT_Algorithm'
  },
  {
    id: 2,
    key: 'coffee',
    category: 'Academic',
    date: 'Apr 2026 - May 2026',
    teamSize: 7,
    techStack: ['React', 'Vite', 'CSS Modules', 'Chart.js'],
    image: '/coffee-pos.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006'
  },
  {
    id: 3,
    key: 'parker',
    category: 'Personal',
    date: 'Jun 2026 - Jul 2026',
    teamSize: 1,
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    image: '/parker.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/tranannhtu21012006/PeterParker'
  }
];
