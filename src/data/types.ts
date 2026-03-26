export interface Review {
  author: string;
  text: string;
  rating: number;
}

export interface WorkSample {
  title: string;
  description: string;
}

export interface RecentProject {
  title: string;
  description: string;
  category: string;
  completedDate: string;
  duration: string;
  studentName: string;
  outcome: string;
  thumbnail: string;
}

export interface Provider {
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
  recentProjects: RecentProject[];
}

/** @deprecated Use Provider instead */
export type Instructor = Provider;
