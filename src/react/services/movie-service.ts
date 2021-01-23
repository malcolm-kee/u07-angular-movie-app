import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/movie';

const baseUrl = environment.apiBase; // URL to web API
const apiKey = environment.apiKey;
const nextMonth = (function () {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
})();

export const getLatestReleases = () => {
  return axios
    .get<ListResult<Movie>>(`${baseUrl}/discover/movie`, {
      params: {
        api_key: apiKey,
        sort_by: 'release_date.desc',
        'primary_release_date.lte': `${nextMonth.getFullYear()}-${(
          nextMonth.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-01`,
        include_adult: 'false',
        include_video: 'false',
        page: '1',
      },
    })
    .then((res) => res.data);
};

export const getMovieDetails = (id: string) => {
  return axios
    .get<Movie>(`${baseUrl}/movie/${id}`, {
      params: {
        api_key: apiKey,
        append_to_response: 'credits',
      },
    })
    .then((res) => res.data);
};

export interface ListResult<Type> {
  page: number;
  results: Type[];
  total_pages: number;
  total_results: number;
}
