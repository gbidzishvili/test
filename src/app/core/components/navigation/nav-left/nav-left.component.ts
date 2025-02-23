import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SidenavToggleService } from '../services/sidenav-toggle.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-left.component.html',
})
export class NavLeftComponent {
  sidenavToggleService = inject(SidenavToggleService);
}
