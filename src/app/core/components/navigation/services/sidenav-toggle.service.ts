import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavToggleService {
  sidebarVisible = signal<boolean>(true);

  constructor() {}
}
