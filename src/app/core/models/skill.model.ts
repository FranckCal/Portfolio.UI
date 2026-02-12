// ========================================
// src/app/core/models/skill.model.ts
// ========================================
export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}