import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SidenavToggleService } from '../services/sidenav-toggle.service';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-left.component.html',
})
export class NavLeftComponent {
  sidenavToggleService = inject(SidenavToggleService);
}
