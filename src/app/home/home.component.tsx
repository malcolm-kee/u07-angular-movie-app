import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from 'src/react/pages/home';
import { ReactAdapterProvider } from '../react-adapter.provider';
import { ReactAdapterService } from '../react-adapter.service';

@Component({
  template: '<div #container></div>',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false })
  wrapper: ElementRef<HTMLDivElement>;

  constructor(private readonly adapterService: ReactAdapterService) {}

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.wrapper.nativeElement);
  }

  render() {
    if (this.wrapper && this.wrapper.nativeElement) {
      ReactDOM.render(
        <ReactAdapterProvider adapter={this.adapterService}>
          <Home />
        </ReactAdapterProvider>,
        this.wrapper.nativeElement
      );
    }
  }
}
