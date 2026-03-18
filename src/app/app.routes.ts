// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CvComponent } from './features/cv/cv.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { BlogComponent } from './features/blog/blog.component';
import { LoginComponent } from './features/admin/features/admin/login/login.component';
import { DashboardComponent } from './features/admin/features/admin/dashboard/dashboard.component';
import { ProjectsComponent } from './features/admin/features/admin/projects/projects.component';
import { BlogAdminComponent } from './features/admin//features/admin/blog-admin/blog-admin.component';
import { ProfileAdminComponent } from './features/admin//features/admin/profile-admin/profile-admin.component';
// Update the path if 'auth.guard.ts' is located elsewhere, for example:
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Routes publiques
  { path: '', component: HomeComponent },
  { path: 'cv', component: CvComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogComponent },

  // Routes Admin
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard],  // ← Protégé par JWT
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'blog', component: BlogAdminComponent },
      { path: 'profile', component: ProfileAdminComponent },
    ]
  },

  // 404
  { path: '**', redirectTo: '' }
];