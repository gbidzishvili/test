import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { User } from '../../../models/user.model';
import { TooltipDirective } from '../../../../../shared/directives/tooltip.directive';
import { Router } from '@angular/router';
import { FallbackImageDirective } from '../../../../../shared/directives/fallback-image.directive';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TooltipDirective, FallbackImageDirective],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  users = input<User[]>();
  public router = inject(Router);

  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
}
