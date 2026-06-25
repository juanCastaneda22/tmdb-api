import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SearchComponent } from './pages/search/search';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
