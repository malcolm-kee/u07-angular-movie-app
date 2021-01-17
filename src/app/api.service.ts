import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Movie } from './movie';

const nextMonth = (function () {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
})();
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBase; // URL to web API
  // ************  https://www.themoviedb.org/documentation/api  ************ //

  private apiKey = environment.apiKey;
  // private baseUrl = environment.apiBase;  // URL to web API

  constructor(private http: HttpClient) {}

  // ToDo Make date dynamic
  // Returns list of upcoming releases this year (hard coded to 2020-12-30)
  getLatestReleases() {
    return this.http.get<ListResult<Movie>>(`${this.baseUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
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
    });
  }

  // Returns list of trending movies 20/page - 1000 pages
  getTrending(page: number) {
    return this.http.get<ListResult<Movie>>(
      `${this.baseUrl}/trending/movie/week`,
      {
        params: {
          api_key: this.apiKey,
          page: String(page),
        },
      }
    );
  }

  // Returns list of popular movies 20/page - 500 pages
  getPopular(page: number) {
    return this.http.get<ListResult<Movie>>(`${this.baseUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page: String(page),
      },
    });
  }

  // Return details of a movie
  getMovieDetails(id: number): Observable<Movie[]> {
    console.log(`getMovieDetails id: ${id}`);
    return this.http
      .get<Movie[]>(`${this.baseUrl}/movie/${id}`, {
        params: {
          api_key: this.apiKey,
          append_to_response: 'credits',
        },
      })
      .pipe(catchError(this.handleError<Movie[]>('getMovieDetails', [])));
  }

  // Return details of a person
  getPeopleDetails(id: number): Observable<any[]> {
    console.log(`getMovieDetails id: ${id}`);
    return this.http
      .get<any[]>(`${this.baseUrl}/person/${id}`, {
        params: {
          api_key: this.apiKey,
          append_to_response: 'credits',
        },
      })
      .pipe(catchError(this.handleError<any[]>('getPersonDetails', [])));
  }

  // Return details of a tv show
  getTvDetails(id: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/tv/${id}`, {
        params: {
          api_key: this.apiKey,
          append_to_response: 'credits',
        },
      })
      .pipe(catchError(this.handleError<any[]>('getTvDetails', [])));
  }

  /* GET Movies, tv-series and people that contains search term */
  searchMulti(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<any>(`${this.baseUrl}/search/multi`, {
        params: {
          api_key: this.apiKey,
          query: term,
        },
      })
      .pipe(catchError(this.handleError<any>('searchMulti', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export interface ListResult<Type> {
  page: number;
  results: Type[];
  total_pages: number;
  total_results: number;
}
