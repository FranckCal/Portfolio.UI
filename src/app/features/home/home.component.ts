// ========================================
// src/app/features/home/home.component.ts
// ========================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { SkillService } from '../../core/services/skill.service';
import { Profile, Skill } from '../../core/models/profile.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: Profile | null = null;
  skills: Skill[] = [];
  loading = true;
  error = '';

  techStack = [
    { name: '.NET 10', icon: '🔷', category: 'Backend' },
    { name: 'C#', icon: '💻', category: 'Backend' },
    { name: 'Angular 19', icon: '🅰️', category: 'Frontend' },
    { name: 'TypeScript', icon: '📘', category: 'Frontend' },
    { name: 'Azure', icon: '☁️', category: 'Cloud' },
    { name: 'SQL Server', icon: '🗄️', category: 'Database' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Git', icon: '📦', category: 'DevOps' }
  ];

  stats = [
    { value: '17+', label: 'Années d\'expérience' },
    { value: '50+', label: 'Projets réalisés' },
    { value: '10+', label: 'Technologies maîtrisées' },
    { value: '100%', label: 'Satisfaction client' }
  ];

  constructor(
    private profileService: ProfileService,
    private skillService: SkillService
  ) {
        console.log('🏗️ HomeComponent constructor appelé');
  }

  ngOnInit(): void {
      console.log('🚀 HomeComponent ngOnInit appelé');
    this.loadData();
  }

  loadData(): void {
       console.log('📡 loadData appelé');
    this.loading = false;
    
    // Charger le profil
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.error = 'Impossible de charger les données';
        this.loading = false;
      }
    });

    // Charger les compétences
    this.skillService.getAllSkills().subscribe({
      next: (skills) => {
        this.skills = skills.slice(0, 8); 
 // Top 8 compétences
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences', err);
      
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}