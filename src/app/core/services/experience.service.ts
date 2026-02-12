// ========================================
// src/app/core/services/experience.service.ts
// ========================================
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Experience } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends ApiService {
  
  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/experience/${id}`);
  }
}