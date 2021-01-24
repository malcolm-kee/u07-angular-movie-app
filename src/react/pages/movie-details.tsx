import * as React from 'react';
import { useMovieDetails } from 'src/react/queries/movie.queries';

export interface MovieDetailsProps {
  id: string;
}

export const MovieDetails = (props: MovieDetailsProps) => {
  const { data } = useMovieDetails(props.id);

  if (!data) {
    return null;
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid movie-detail-img-container position-relative">
        <div className="bg-container">
          {data.backdrop_path && (
            <img
              className="bg-img"
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            />
          )}
        </div>

        {data.poster_path && (
          <img
            className="poster-img-single-detail img-fluid"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            title={data.title}
            alt={data.title}
          />
        )}
      </div>
      <div className="detail-text-container">
        <h1 className="h1-responsive heading">
          {data.title} ({data.release_date.slice(0, 4)})
        </h1>
        {data.original_title !== data.title && (
          <h1 className="h1-responsive heading">
            Original Title: {data.original_title}
          </h1>
        )}

        {data.tagline && <p className="ml-3">Tagline: "{data.tagline}"</p>}

        <p className="ml-3">
          Vote average: <strong>{data.vote_average}</strong>
        </p>

        {data.genres && data.genres.length > 0 && (
          <div>
            <h3 className="h3-responsive">Genres:</h3>
            <div>
              {data.genres.map((genre) => (
                <span className="ml-3" key={genre.name}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.overview.length > 0 && (
          <div className="plot-summary">
            <h3 className="h3-responsive mt-3">Summary:</h3>
            <p className="ml-3">{data.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};
