// ========================================
// src/app/features/blog/blog.component.ts
// ========================================
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../core/services/blog.service';
import { BlogPost } from '../../core/models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  selectedTag = 'Tous';
  searchQuery = '';
  allTags: string[] = ['Tous'];
  loading = true;
  error = '';

  constructor(
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = '';

    this.blogService.getAllPosts().subscribe({
      next: (posts) => {
        console.log('✅ Posts reçus:', posts);
        this.posts = posts;
        this.filteredPosts = posts;
        this.buildTags(posts);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
        this.error = 'Impossible de charger les articles';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildTags(posts: BlogPost[]): void {
    const tags = new Set<string>();
    posts.forEach(p => {
      try {
        const parsed = JSON.parse(p.tags);
        if (Array.isArray(parsed)) {
          parsed.forEach((t: string) => tags.add(t));
        }
      } catch {
        p.tags.split(',').forEach(t => tags.add(t.trim()));
      }
    });
    this.allTags = ['Tous', ...Array.from(tags)];
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.posts;

    if (this.selectedTag !== 'Tous') {
      result = result.filter(p => {
        try {
          const tags = JSON.parse(p.tags);
          return tags.includes(this.selectedTag);
        } catch {
          return p.tags.includes(this.selectedTag);
        }
      });
    }

    if (this.searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.summary.toLowerCase().includes(this.searchQuery)
      );
    }

    this.filteredPosts = result;
  }

  openPost(post: BlogPost): void {
    this.selectedPost = post;
    // Incrémenter le view count
    this.blogService.getPostBySlug(post.slug).subscribe();
    document.body.style.overflow = 'hidden';
  }

  closePost(): void {
    this.selectedPost = null;
    document.body.style.overflow = 'auto';
  }

  getTagList(tags: string): string[] {
    try {
      return JSON.parse(tags);
    } catch {
      return tags.split(',').map(t => t.trim());
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Convertir le markdown basique en HTML
  parseMarkdown(content: string): string {
    return content
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-primary-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```[\s\S]*?```/g, (match) => {
        const code = match.replace(/```\w*\n?/, '').replace(/```$/, '');
        return `<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">${code}</pre>`;
      })
      .replace(/^- (.*$)/gm, '<li class="flex items-start gap-2 text-gray-700"><span class="text-primary-600 mt-1">•</span><span>$1</span></li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="flex items-start gap-2 text-gray-700"><span class="text-primary-600 font-bold">$1.</span><span>$2</span></li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l|p|u|o|p])/gm, '');
  }
}