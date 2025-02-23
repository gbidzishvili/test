import { Component } from '@angular/core';
import { UserFormComponent } from './add-user-form/user-form.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {}
