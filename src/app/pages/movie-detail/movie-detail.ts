import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { MovieDetail } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetailComponent implements OnInit {
  private tmdb = inject(TmdbService);
  private route = inject(ActivatedRoute);

  movie = signal<MovieDetail | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  imageBaseUrl = 'https://image.tmdb.org/t/p';

  backdropUrl = computed(() => this.movie()?.backdrop_path
    ? `${this.imageBaseUrl}/w1280${this.movie()!.backdrop_path}`
    : null
  );

  posterUrl = computed(() => this.movie()?.poster_path
    ? `${this.imageBaseUrl}/w500${this.movie()!.poster_path}`
    : null
  );

  genres = computed(() => this.movie()?.genres?.map(g => g.name).join(', ') || 'N/A');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadMovieDetails(id);
      }
    });
  }

  loadMovieDetails(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.tmdb.getMovieDetails(id).subscribe({
      next: (movie: MovieDetail) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load movie details.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }
}
