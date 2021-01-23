import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieDetails } from 'src/react/pages/movie-details';
import { ReactAdapterProvider } from '../react-adapter.provider';
import { ReactAdapterService } from '../react-adapter.service';

@Component({
  template: '<div #container></div>',
})
export class MovieDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false })
  wrapper: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private adapter: ReactAdapterService
  ) {}

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.wrapper.nativeElement);
  }

  render() {
    if (this.wrapper && this.wrapper.nativeElement) {
      ReactDOM.render(
        <ReactAdapterProvider adapter={this.adapter}>
          <MovieDetails id={this.route.snapshot.paramMap.get('id')} />
        </ReactAdapterProvider>,
        this.wrapper.nativeElement
      );
    }
  }
}
