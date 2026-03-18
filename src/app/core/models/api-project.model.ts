// ========================================
// src/app/core/models/api-project.model.ts
// ========================================
export interface ApiProject {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  swaggerUrl?: string;
  liveApiUrl?: string;
  createdDate: Date;
  status: 'active' | 'maintenance' | 'prototype';
  icon: string;
}
