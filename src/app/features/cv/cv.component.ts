
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';  // ← Ajouter cet import
import { ProfileService } from '../../core/services/profile.service';
import { SkillService } from '../../core/services/skill.service';
import { ExperienceService } from '../../core/services/experience.service';
import { Profile, Experience, Skill } from '../../core/models/profile.model';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  profile: Profile | null = null;
  experiences: Experience[] = [];
  skillsByCategory: Map<string, Skill[]> = new Map();
  loading = false;
  error = '';

  constructor(
    private profileService: ProfileService,
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    // Attendre que TOUS les appels soient terminés
    forkJoin({
      profile: this.profileService.getProfile(),
      experiences: this.experienceService.getAllExperiences(),
      skills: this.skillService.getAllSkills()
    }).subscribe({
      next: (result) => {
        console.log('✅ Toutes les données chargées:', result);
        
        this.profile = result.profile;
        this.experiences = result.experiences;
        this.groupSkillsByCategory(result.skills);
        
        this.loading = false;  // ← S'exécute quand TOUT est chargé
              this.cdr.detectChanges();
          console.log('🔴 loading =', this.loading);  // ← Ajouter cette ligne
      },
      error: (err) => {
        console.error('❌ Erreur chargement:', err);
        this.error = 'Impossible de charger le CV';
        this.loading = false;
      }
    });
  }

  groupSkillsByCategory(skills: Skill[]): void {
    skills.forEach(skill => {
      if (!this.skillsByCategory.has(skill.category)) {
        this.skillsByCategory.set(skill.category, []);
      }
      this.skillsByCategory.get(skill.category)?.push(skill);
    });
  }

  getSkillCategories(): string[] {
    return Array.from(this.skillsByCategory.keys());
  }

  getSkillsForCategory(category: string): Skill[] {
    return this.skillsByCategory.get(category) || [];
  }

  calculateDuration(startDate: Date, endDate?: Date): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} mois`;
    } else if (remainingMonths === 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    } else {
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  downloadPDF(): void {
    alert('Fonctionnalité à venir : téléchargement du CV en PDF');
  }

  print(): void {
    window.print();
  }
}