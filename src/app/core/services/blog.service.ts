// ========================================
// src/app/core/services/blog.service.ts
// ========================================
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends ApiService {
  
  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog`);
  }

  getAllPostsIncludingDrafts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog/all`);
  }

  getPostBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog/${slug}`);
  }

  createPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/blog`, post);
  }

  updatePost(id: number, post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/blog/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/blog/${id}`);
  }
}