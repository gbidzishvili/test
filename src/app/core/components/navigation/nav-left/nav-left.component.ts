import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SidenavToggleService } from '../services/sidenav-toggle.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './nav-left.component.html',
  styles: [
    `
      .active {
        background-color: #f3f4f6;
        color: #111827;
      }
    `,
  ],
})
export class NavLeftComponent {
  sidenavToggleService = inject(SidenavToggleService);
}
