import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdbToken}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getPopularMovies(page = 1): Observable<any> {
    const params = new HttpParams()
      .set('language', 'en-US')
      .set('page', page.toString());

    return this.http.get(`${environment.tmdbApiUrl}/movie/popular`, {
      headers: this.headers,
      params
    });
  }

  searchMovies(query: string, page = 1): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('language', 'en-US')
      .set('page', page.toString())
      .set('include_adult', 'false');

    return this.http.get(`${environment.tmdbApiUrl}/search/movie`, {
      headers: this.headers,
      params
    });
  }

  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams()
      .set('language', 'en-US');

    return this.http.get(`${environment.tmdbApiUrl}/movie/${id}`, {
      headers: this.headers,
      params
    });
  }
}
