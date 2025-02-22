import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CustomUploaderComponent } from '../custom-uploader/custom-uploader.component';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { Store } from '@ngrx/store';
import { addUser } from '../../../../state/users/user.action';
import { UserService } from '../../services/user.service';

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
    console.log(this.userForm.value);
    this.store.dispatch(addUser({ user: this.userForm.value }));
    this.userForm.reset();
  }
}
