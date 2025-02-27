import { isPlatformBrowser } from '@angular/common';
import {
  HostListener,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavToggleService {
  sidebarVisible = signal<boolean>(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarVisibility();
      this.listenToResize();
    }
  }

  private listenToResize(): void {
    fromEvent(window, 'resize')
      .pipe(throttleTime(200)) // Prevents excessive function calls
      .subscribe(() => this.updateSidebarVisibility());
  }

  private updateSidebarVisibility(): void {
    if (window.innerWidth < 700) {
      this.sidebarVisible.set(false);
    } else {
      this.sidebarVisible.set(true);
    }
  }
}
