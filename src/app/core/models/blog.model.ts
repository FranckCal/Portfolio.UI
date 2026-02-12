// ========================================
// src/app/core/models/blog.model.ts
// ========================================
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  imageUrl: string;
  tags: string;
  isPublished: boolean;
  viewCount: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}