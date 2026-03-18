// ========================================
// src/app/core/config/apis.config.ts
// ========================================
import { ApiProject } from '../models/api-project.model';

export const APIS_CONFIG: ApiProject[] = [
  {
    id: 1,
    title: 'TaskManager API',
    description: 'API REST développée en ASP.NET Core 8 pour la gestion complète de tâches. Inclut CRUD complet, filtrage par statut, système de priorités (Low, Medium, High), validation des données et architecture propre avec Injection de Dépendances.',
    technologies: '.NET 8, C#, Entity Framework Core, SQL Server, RESTful API, Swagger, xUnit, Moq',
    swaggerUrl: 'https://localhost:7180/swagger/index.html',
    liveApiUrl: 'https://localhost:7180',
    githubUrl: 'https://github.com/FranckCal/TaskManagerAPI',
    createdDate: new Date('2026-01-20'),
    status: 'active',
    icon: '✅'
  }
  // Ajoute d'autres APIs ici
];

export const API_BASE_URL = 'https://localhost:7180';
export const API_VERSION = 'v1';
