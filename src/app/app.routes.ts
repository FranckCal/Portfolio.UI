import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CvComponent } from './features/cv/cv.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { BlogComponent } from './features/blog/blog.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
 //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'cv', component: CvComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];