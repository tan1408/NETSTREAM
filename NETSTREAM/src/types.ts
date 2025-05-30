export interface Movie {
  id: number;
  title: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

export interface VideoResult {
  key: string;
  site: string;
  type: string;
}

export interface Genre {
  id: number;
  name: string;
}