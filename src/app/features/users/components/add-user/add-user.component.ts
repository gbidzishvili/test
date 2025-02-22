import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CustomUploaderComponent } from '../../../../shared/components/custom-uploader/custom-uploader.component';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { Store } from '@ngrx/store';
import {
  addUser,
  removeUser,
  updateUser,
} from '../../../../state/users/user.action';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomUploaderComponent,
    AddressFormComponent,
  ],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  userService = inject(UserService);
  userForm!: FormGroup;
  customUploaderReset = signal<any>(false);
  fb = inject(FormBuilder);
  store = inject(Store);
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      personalNumber: ['', [Validators.required, Validators.maxLength(11)]],
      phone: ['', [Validators.required]],
      customUploader: [
        {
          value: [],
          disabled: false,
        },
      ],
    });
  }

  onSubmit() {
    const userId = uuidv4();
    const user = {
      id: userId, // Add the generated id
      ...this.userForm.value, // Spread the form values
    };
    console.log('logUser:', this.userForm.value, user);
    this.store.dispatch(addUser({ user }));
    this.userForm.reset();
  }
  removeUser() {
    this.store.dispatch(removeUser({ id: '1' }));
  }
  updateUser() {
    this.store.dispatch(
      updateUser({
        id: 'abca6590-574d-4a76-b398-0e98fb001895',
        user: this.userForm.value,
      })
    );
  }
}
