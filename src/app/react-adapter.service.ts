import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReactAdapterService {
  constructor(public readonly router: Router) {}
}
