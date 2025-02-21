import { Component, inject } from '@angular/core';
import { SidenavToggleService } from '../navigation/services/sidenav-toggle.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styles: [':host{ width: 100%;}'],
})
export class HeaderComponent {
  sidenavToggleService = inject(SidenavToggleService);

  toggleSidebar() {
    this.sidenavToggleService.sidebarVisible.set(
      !this.sidenavToggleService.sidebarVisible()
    );
    console.log('isVisible', this.sidenavToggleService.sidebarVisible());
  }
}
