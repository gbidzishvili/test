import { Component } from '@angular/core';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AddUserFormComponent],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {}
