import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../../core/services/project.service';
import { BlogService } from '../../../../../core/services/blog.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = { projects: 0, posts: 0 };
  loading = true;

  constructor(
    private projectService: ProjectService,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      projects: this.projectService.getAllProjects(),
      posts: this.blogService.getAllPostsIncludingDrafts()
    }).subscribe({
      next: (result) => {
        this.stats.projects = result.projects.length;
        this.stats.posts = result.posts.length;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}