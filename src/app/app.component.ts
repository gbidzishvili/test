import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { NgClass } from '@angular/common';
import { SidenavToggleService } from './core/components/navigation/services/sidenav-toggle.service';
import { HeaderComponent } from './core/components/header/header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavigationComponent, NgClass, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ng-space-project';
  sidenavToggleService = inject(SidenavToggleService);
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('ka');
    this.translate.use('ka');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
