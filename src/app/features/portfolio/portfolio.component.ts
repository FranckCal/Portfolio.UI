import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { ApiProject } from '../../core/models/api-project.model';
import { APIS_CONFIG } from '../../core/config/apis.config';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedFilter = 'Tous';
  selectedProject: Project | null = null;
  loading = true;
  error = '';
  filters: string[] = ['Tous'];

  // APIs & Side Projects
  apis: ApiProject[] = APIS_CONFIG;

  techIcons: { [key: string]: string } = {
    'NET 10': '🔷',
    'C#': '💻',
    'Angular': '🅰️',
    'Angular 19': '🅰️',
    'TypeScript': '📘',
    'Azure': '☁️',
    'Azure Functions': '⚡',
    'SQL Server': '🗄️',
    'MongoDB': '🍃',
    'Docker': '🐳',
    'JWT': '🔐',
    'Tailwind CSS': '🎨',
    'ASP.NET MVC': '🔷',
    'jQuery': '💛',
    'Bootstrap': '🅱️',
    'VB.NET': '🔵',
    'ASP.NET': '🔷',
    'GitLab': '🦊',
  };

  categoryColors: { [key: string]: string } = {
    'MADIC Industries': 'bg-blue-100 text-blue-800',
    'Cdiscount': 'bg-orange-100 text-orange-800',
    'ISPED - Université Victor Ségalen': 'bg-green-100 text-green-800',
    'Projet Personnel': 'bg-purple-100 text-purple-800',
  };

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef  // ← Ajouter
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = '';

    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        console.log('✅ Projets reçus:', projects);
        this.projects = projects;
        this.filteredProjects = projects;
        this.buildFilters(projects);
        this.loading = false;
        this.cdr.detectChanges();  // ← Forcer détection
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
        this.error = 'Impossible de charger les projets';
        this.loading = false;
        this.cdr.detectChanges();  // ← Forcer détection
      }
    });
  }

  buildFilters(projects: Project[]): void {
    const techs = new Set<string>();
    projects.forEach(p => {
      p.technologies.split(',').forEach(t => techs.add(t.trim()));
    });
    this.filters = ['Tous', ...Array.from(techs)];
  }

  applyFilter(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'Tous') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p =>
        p.technologies.split(',').map(t => t.trim()).includes(filter)
      );
    }
  }

  openProject(project: Project): void {
    this.selectedProject = project;
  }

  closeProject(): void {
    this.selectedProject = null;
  }

  getTechList(technologies: string): string[] {
    return technologies.split(',').map(t => t.trim());
  }

  getTechIcon(tech: string): string {
    return this.techIcons[tech] || '🔧';
  }

  getCategoryColor(company: string): string {
    return this.categoryColors[company] || 'bg-gray-100 text-gray-800';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  }

  calculateDuration(startDate: Date, endDate?: Date): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 +
                   (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years === 0) return `${rem} mois`;
    if (rem === 0) return `${years} an${years > 1 ? 's' : ''}`;
    return `${years} an${years > 1 ? 's' : ''} ${rem} mois`;
  }

  getStatusBadge(status: string): { color: string; label: string } {
    const badges: { [key: string]: { color: string; label: string } } = {
      'active': { color: 'bg-green-100 text-green-800', label: '🟢 Actif' },
      'maintenance': { color: 'bg-yellow-100 text-yellow-800', label: '🟡 En maintenance' },
      'prototype': { color: 'bg-blue-100 text-blue-800', label: '🔵 Prototype' }
    };
    return badges[status] || { color: 'bg-gray-100 text-gray-800', label: 'Inconnu' };
  }
}