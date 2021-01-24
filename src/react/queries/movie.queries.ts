import { useQuery, useQueryClient } from 'react-query';
import { getLatestReleases, getMovieDetails } from '../services/movie-service';

export const useLatestReleases = () => {
  const queryClient = useQueryClient();

  return useQuery(QUERY_KEYS.latestReleases, getLatestReleases, {
    onSuccess: (result) => {
      if (result.results) {
        result.results.forEach((movie) =>
          queryClient.setQueryData(
            [QUERY_KEYS.movieDetails, String(movie.id)],
            movie
          )
        );
      }
    },
  });
};

export const useMovieDetails = (id: string) =>
  useQuery([QUERY_KEYS.movieDetails, id], () => getMovieDetails(id));

const QUERY_KEYS = {
  latestReleases: 'latestReleases',
  movieDetails: 'movieDetails',
};
