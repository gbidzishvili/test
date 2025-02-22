import { Component, inject, signal } from '@angular/core';
import { CustomUploaderComponent } from '../../../../../shared/components/custom-uploader/custom-uploader.component';
import { AddressFormComponent } from '../../../../../shared/components/address-form/address-form.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addUser,
  removeUser,
  updateUser,
} from '../../../../../state/users/user.action';
import { UserService } from '../../../services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomUploaderComponent, AddressFormComponent],
  templateUrl: './add-user-form.component.html',
})
export class AddUserFormComponent {
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
        updateUser: this.userForm.value,
      })
    );
  }
}
