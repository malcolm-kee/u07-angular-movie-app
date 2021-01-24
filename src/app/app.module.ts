import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PopularComponent } from './popular/popular.component';
import { SearchComponent } from './search/search.component';
import { TrendingComponent } from './trending/trending.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    PopularComponent,
    HomeComponent,
    MovieDetailComponent,
    SearchComponent,
    PeopleDetailComponent,
    TvDetailComponent,
    NavBarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
