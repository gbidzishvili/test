import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { UserFormComponent } from './add-user-form/user-form.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  @Input() set id(id: string) {
    this.userId.set(id);
    console.log('idIsin addUser', this.userId());
  }
  userId = signal<string>('');
}
