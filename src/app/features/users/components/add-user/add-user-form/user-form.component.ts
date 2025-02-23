import { Component, inject, Input, signal, SimpleChange } from '@angular/core';
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
import { UsersService } from '../../../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomUploaderComponent, AddressFormComponent],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  usersService = inject(UsersService);
  userForm!: FormGroup;
  customUploaderReset = signal<boolean>(false);
  fb = inject(FormBuilder);
  store = inject(Store);
  activatedRouter = inject(ActivatedRoute);
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      personalNumber: ['', [Validators.required, Validators.maxLength(11)]],
      mobileNumber: ['', [Validators.required]],
      image: [
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
      id: userId,
      ...this.userForm.value,
    };
    this.store.dispatch(addUser({ user }));
    this.resetForm();
  }
  resetForm() {
    this.userForm.reset();
    this.customUploaderReset.set(true);
  }
}
