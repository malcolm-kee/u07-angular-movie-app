import * as React from 'react';
import { Link } from 'src/react/modules/routing/link';
import { useLatestReleases } from 'src/react/queries/movie.queries';

export const Home = () => {
  const { data } = useLatestReleases();

  return (
    <>
      <h1 className="title text-center h1-responsive">
        Your Last Movie Database
      </h1>
      <div>
        <div className="container">
          <h2 className="h2 heading">Upcoming movies</h2>
        </div>
      </div>
      {data && (
        <div className="row">
          {data.results.map((movie) => (
            <div
              className="col-4 col-md-4 col-lg-3 my-3 px-2 px-md-4"
              key={movie.id}
            >
              {movie.poster_path ? (
                <Link className="view overlay zoom" to={`/movie/${movie.id}`}>
                  <img
                    className="poster-img hoverable"
                    src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                    title={movie.title}
                    alt={movie.title}
                  />
                </Link>
              ) : (
                <Link className="view overlay zoom" to={`/movie/${movie.id}`}>
                  <div className="hoverable mb-3 img-placeholder row align-content-center justify-content-center flex-row">
                    <i className="far fa-image mb-3 col-12"></i>
                    <h5 className="missing-img-title col h5 heading">
                      {movie.title}
                    </h5>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
