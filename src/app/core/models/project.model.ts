// ========================================
// src/app/core/models/project.model.ts
// ========================================
export interface Project {
  id: number;
  title: string;
  description: string;
  company: string;
  technologies: string;
  imageUrl: string;
  gitHubUrl: string;
  liveDemoUrl: string;
  startDate: Date;
  endDate?: Date;
  isFeatured: boolean;
  order: number;
}