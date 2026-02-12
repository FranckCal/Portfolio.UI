// ========================================
// src/app/core/models/profile.model.ts
// ========================================
export interface Skill { 
  id: number;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  gitHubUrl: string;
  profileImageUrl: string;
  yearsOfExperience: number;
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  technologies: string;
  achievements: string;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  year: number;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: number;
  credentialUrl: string;
}