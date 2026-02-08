
export enum Gender {
  MALE = 'ชาย',
  FEMALE = 'หญิง',
  OTHER = 'อื่นๆ'
}

export enum Element {
  WOOD = 'ไม้',
  FIRE = 'ไฟ',
  EARTH = 'ดิน',
  METAL = 'ทอง',
  WATER = 'น้ำ'
}

export interface UserInput {
  fullName: string;
  gender: Gender;
  occupation: string;
  birthDate: string;
  birthTime: string;
  isTimeUnknown: boolean;
  zodiac: string;
  birthDayOfWeek: string;
  birthPlace: string;
  lifeGoals: string[]; // Changed to array
  urgentProblems: string[]; // Changed to array
  nameStyle: string[]; // Changed to array
}

export interface NameEntry {
  thai: string;
  english: string;
  meaning: string;
  numerologySum: number;
}

export interface AnalysisResult {
  dominantElement: Element;
  neededElement: Element;
  currentTraits: string;
  potentialResult: string;
  namingConcept: string;
  currentNameScore: number;
  currentNameAnalysis: string;
  auspiciousPotential: number;
  realNames: NameEntry[];
  nickNames: NameEntry[];
}

export interface UserProfile {
  name: string;
  email: string;
  picture: string;
  likedNames: string[];
}
