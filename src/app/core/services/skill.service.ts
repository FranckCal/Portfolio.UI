// ========================================
// src/app/core/services/skill.service.ts
// ========================================
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends ApiService {
  
  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skill`);
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skill/category/${category}`);
  }
}