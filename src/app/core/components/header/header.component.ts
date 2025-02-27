import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SidenavToggleService } from '../navigation/services/sidenav-toggle.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, RouterLink],
  templateUrl: './header.component.html',
  styles: [':host{ width: 100%;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  sidenavToggleService = inject(SidenavToggleService);
  isMenuOpen = signal(false);
  toggleSidebar() {
    this.sidenavToggleService.sidebarVisible.set(
      !this.sidenavToggleService.sidebarVisible()
    );
  }
  toggleUserMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
