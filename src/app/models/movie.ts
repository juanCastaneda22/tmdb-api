export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  genre_ids?: number[];
  original_title?: string;
  original_language?: string;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
}

export interface MovieDetail extends Movie {
  runtime: number;
  status: string;
  budget: number;
  revenue: number;
  genres?: { id: number; name: string }[];
  tagline?: string;
  homepage?: string;
  imdb_id?: string;
  production_companies?: { id: number; name: string; logo_path: string }[];
  spoken_languages?: { iso_639_1: string; name: string }[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}
