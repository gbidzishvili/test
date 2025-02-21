import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavToggleService } from './services/sidenav-toggle.service';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavLeftComponent, CommonModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  sidenavToggleService = inject(SidenavToggleService);
  ngOnInit() {
    console.log('isVisible', this.sidenavToggleService.sidebarVisible());
  }

  toggleSidebar() {
    this.sidenavToggleService.sidebarVisible.set(
      !this.sidenavToggleService.sidebarVisible()
    );
    console.log('isVisible', this.sidenavToggleService.sidebarVisible());
  }
}
