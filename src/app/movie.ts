export interface Movie {
  id: number;
  original_title: string;
  title: string;
  tagline: string;
  overview: string;
  genres: Array<{
    name: string;
  }>;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
}
