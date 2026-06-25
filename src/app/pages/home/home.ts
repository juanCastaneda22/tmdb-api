import { Component, OnInit, signal, computed } from '@angular/core';
import { TmdbService } from '../../services/tmdb';
import { Movie, MovieResponse } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  movies = signal<Movie[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.loadPopularMovies();
  }

  loadPopularMovies(page = 1) {
    this.loading.set(true);
    this.error.set(null);
    
    this.tmdb.getPopularMovies(page).subscribe({
      next: (res: MovieResponse) => {
        if (page === 1) {
          this.movies.set(res.results);
        } else {
          this.movies.update(current => [...current, ...res.results]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load movies. Please try again.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onScroll() {
    if (!this.loading()) {
      const nextPage = Math.floor(this.movies().length / 20) + 1;
      this.loadPopularMovies(nextPage);
    }
  }
}
