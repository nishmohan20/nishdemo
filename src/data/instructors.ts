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
  reviews: Review[];
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
  },
  {
    id: "6",
    name: "Marcus Laurent",
    photo: instructor6,
    score: 4.8,
    reviewCount: 73,
    skills: ["French", "Spanish", "ESL"],
    isNew: true,
    bio: "Polyglot fluent in 5 languages. Former translator for the UN. Conversational teaching method.",
    hourlyRate: 50,
    reviews: [
      { author: "Olivia P.", text: "My French improved dramatically in just one month with Marcus.", rating: 5 },
      { author: "Diego M.", text: "Fun and engaging lessons. Never a dull moment.", rating: 4 },
    ],
  },
];
