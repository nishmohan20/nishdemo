import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";
import instructor4 from "@/assets/instructor-4.jpg";
import instructor5 from "@/assets/instructor-5.jpg";
import instructor6 from "@/assets/instructor-6.jpg";

export interface Review {
  author: string;
  text: string;
  rating: number;
}

export interface WorkSample {
  title: string;
  description: string;
}

export interface Instructor {
  id: string;
  name: string;
  photo: string;
  score: number;
  reviewCount: number;
  skills: string[];
  isNew: boolean;
  bio: string;
  hourlyRate: number;
  discountRate?: number;
  reviews: Review[];
  verified: boolean;
  responseTime?: string;
  satisfactionGuarantee: boolean;
  workSamples: WorkSample[];
  backgroundCheck: boolean;
  profileViews: number;
  totalBookings: number;
  whyChooseMe?: string;
}

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    photo: instructor1,
    score: 4.9,
    reviewCount: 127,
    skills: ["Piano", "Music Theory", "Vocals"],
    isNew: false,
    bio: "Classically trained pianist with 10+ years of teaching experience. Berklee College of Music graduate.",
    hourlyRate: 45,
    reviews: [
      { author: "Emma W.", text: "Sarah made learning piano so fun and intuitive. Highly recommend!", rating: 5 },
      { author: "Jake R.", text: "Excellent teacher, very patient with beginners.", rating: 5 },
    ],
    verified: true,
    responseTime: "< 1 hour",
    satisfactionGuarantee: true,
    workSamples: [
      { title: "Beginner Piano Curriculum", description: "Structured 12-week program from zero to confident player" },
    ],
    backgroundCheck: true,
    profileViews: 1243,
    totalBookings: 89,
    whyChooseMe: "I tailor every lesson to your pace and goals. Whether you're 8 or 80, I'll have you playing your favorite songs within weeks.",
  },
  {
    id: "2",
    name: "David Chen",
    photo: instructor2,
    score: 4.8,
    reviewCount: 89,
    skills: ["Calculus", "Linear Algebra", "Statistics"],
    isNew: false,
    bio: "PhD in Applied Mathematics from MIT. Specializes in making complex concepts accessible.",
    hourlyRate: 55,
    reviews: [
      { author: "Priya S.", text: "David helped me ace my calculus final. Clear explanations.", rating: 5 },
      { author: "Tom L.", text: "Great at breaking down tough problems step by step.", rating: 4 },
    ],
    verified: true,
    responseTime: "< 2 hours",
    satisfactionGuarantee: true,
    workSamples: [
      { title: "Calculus Crash Course", description: "Intensive exam-prep series covering all core topics" },
    ],
    backgroundCheck: true,
    profileViews: 987,
    totalBookings: 64,
    whyChooseMe: "I've helped 200+ students go from failing to acing their exams. I focus on building intuition, not just memorizing formulas.",
  },
  {
    id: "3",
    name: "Alex Rivera",
    photo: instructor3,
    score: 0,
    reviewCount: 0,
    skills: ["Python", "React", "Data Science"],
    isNew: true,
    bio: "Full-stack developer and former Google engineer. Passionate about teaching the next generation of coders.",
    hourlyRate: 60,
    discountRate: 39,
    reviews: [],
    verified: true,
    responseTime: "< 30 min",
    satisfactionGuarantee: true,
    workSamples: [
      { title: "React Dashboard Project", description: "Built a real-time analytics dashboard used by 50k+ users" },
      { title: "Python ML Pipeline", description: "End-to-end machine learning pipeline for production" },
    ],
    backgroundCheck: true,
    profileViews: 412,
    totalBookings: 3,
    whyChooseMe: "I teach the way I wish someone taught me — with real projects, not textbook exercises. You'll build portfolio-ready work from day one.",
  },
  {
    id: "4",
    name: "Luna Pérez",
    photo: instructor4,
    score: 4.9,
    reviewCount: 102,
    skills: ["Watercolor", "Oil Painting", "Sketching"],
    isNew: false,
    bio: "MFA from RISD. Exhibited in galleries worldwide. Believes everyone has an inner artist.",
    hourlyRate: 40,
    reviews: [
      { author: "Chris D.", text: "Luna's watercolor workshop was transformative. So inspiring!", rating: 5 },
      { author: "Nina B.", text: "Patient, encouraging, and incredibly talented.", rating: 5 },
    ],
    verified: true,
    responseTime: "< 3 hours",
    satisfactionGuarantee: false,
    workSamples: [
      { title: "Watercolor Landscapes Series", description: "Collection of 20 works exhibited at NY Gallery" },
    ],
    backgroundCheck: true,
    profileViews: 1567,
    totalBookings: 78,
    whyChooseMe: "Art isn't about talent — it's about seeing. I'll teach you to observe the world differently, and the art follows naturally.",
  },
  {
    id: "5",
    name: "Maya Johnson",
    photo: instructor5,
    score: 0,
    reviewCount: 0,
    skills: ["Yoga", "HIIT", "Nutrition"],
    isNew: true,
    bio: "Certified yoga instructor and personal trainer. 500-hour RYT with a holistic wellness approach.",
    hourlyRate: 35,
    discountRate: 22,
    reviews: [],
    verified: true,
    responseTime: "< 1 hour",
    satisfactionGuarantee: true,
    workSamples: [
      { title: "30-Day Wellness Program", description: "Holistic program combining yoga, HIIT, and nutrition plans" },
    ],
    backgroundCheck: true,
    profileViews: 328,
    totalBookings: 5,
    whyChooseMe: "Fitness should feel empowering, not punishing. I create sustainable routines that fit your life, not the other way around.",
  },
  {
    id: "6",
    name: "Marcus Laurent",
    photo: instructor6,
    score: 0,
    reviewCount: 0,
    skills: ["French", "Spanish", "ESL"],
    isNew: true,
    bio: "Polyglot fluent in 5 languages. Former translator for the UN. Conversational teaching method.",
    hourlyRate: 50,
    discountRate: 32,
    reviews: [],
    verified: true,
    responseTime: "< 45 min",
    satisfactionGuarantee: true,
    workSamples: [
      { title: "Conversational French Course", description: "Immersive method used by 200+ students to reach B2 level" },
      { title: "UN Translation Portfolio", description: "5 years of professional multilingual translation work" },
    ],
  },
];
