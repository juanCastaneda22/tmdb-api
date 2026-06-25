import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { Movie, MovieResponse } from '../../models/movie';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent implements OnInit {
  private tmdb = inject(TmdbService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  query = signal('');
  queryValue = '';
  movies = signal<Movie[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  totalResults = signal(0);
  currentPage = signal(1);
  totalPages = signal(0);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.query.set(params['q']);
        this.queryValue = params['q'];
        this.searchMovies(1);
      }
    });
  }

  onSearch() {
    const q = this.query().trim();
    if (q) {
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  searchMovies(page = 1) {
    const q = this.query().trim();
    if (!q) return;

    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    this.tmdb.searchMovies(q, page).subscribe({
      next: (res: MovieResponse) => {
        if (page === 1) {
          this.movies.set(res.results);
        } else {
          this.movies.update(current => [...current, ...res.results]);
        }
        this.totalResults.set(res.total_results);
        this.totalPages.set(res.total_pages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Search failed. Please try again.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  loadMore() {
    if (!this.loading() && this.currentPage() < this.totalPages()) {
      this.searchMovies(this.currentPage() + 1);
    }
  }

  clearSearch() {
    this.query.set('');
    this.queryValue = '';
    this.movies.set([]);
    this.totalResults.set(0);
    this.totalPages.set(0);
    this.router.navigate(['/search']);
  }
}
