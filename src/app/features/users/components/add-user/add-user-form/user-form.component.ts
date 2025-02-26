import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CustomUploaderComponent } from '../../../../../shared/components/custom-uploader/custom-uploader.component';
import { AddressFormComponent } from '../../../../../shared/components/address-form/address-form.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser, updateUser } from '../../../../../state/users/user.action';
import { UsersService } from '../../../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { CustomValidatorsService } from './custom-validators.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomUploaderComponent,
    AddressFormComponent,
  ],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  usersService = inject(UsersService);
  userForm!: FormGroup;
  customUploaderReset = signal<boolean>(false);
  fb = inject(FormBuilder);
  store = inject(Store);
  activatedRouter = inject(ActivatedRoute);
  isEditMode = signal<boolean>(false);
  userId = signal<string>('');
  router = inject(Router);

  customValidators = inject(CustomValidatorsService);
  ngOnInit(): void {
    this.initForm();
    this.checkForEditMode();
  }
  initForm() {
    this.userForm = this.fb.group({
      firstname: ['', this.customValidators.getNameSurnameValidators()],
      lastname: ['', this.customValidators.getNameSurnameValidators()],
      gender: ['', []],
      personalNumber: ['', this.customValidators.getPersonalNumberValidators()],
      mobileNumber: [
        '',
        [
          Validators.pattern(/^5\d{8}$/),
          Validators.required,
          Validators.maxLength(9),
        ],
      ],
      image: [
        {
          value: '',
          disabled: false,
        },
      ],
    });
  }

  checkForEditMode() {
    this.activatedRouter.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode.set(true);
        this.userId.set(id);
        this.usersService.getUserById(id).subscribe((user) => {
          this.patchFormValues(user);
        });
      }
    });
  }

  patchFormValues(user: User) {
    this.addChildControlsDynamically();
    this.userForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      personalNumber: user.personalNumber,
      mobileNumber: user.mobileNumber,
      image: user.image,
      physicalAddress: user.physicalAddress,
      legalAddress: user.legalAddress,
    });
  }

  addChildControlsDynamically() {
    this.addAddressControl('legalAddress');
    this.addAddressControl('physicalAddress');
  }

  addAddressControl(controlName: string) {
    this.userForm.addControl(
      controlName,
      this.fb.group({
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
      })
    );
  }
  getUser() {
    const userFormValue = this.userForm.value;
    return {
      ...userFormValue,
      firstname: userFormValue.firstname.toUpperCase(),
      lastname: userFormValue.lastname.toUpperCase(),
    };
  }
  onSubmit() {
    if (!this.userForm.valid) return;
    const user = this.getUser();
    if (this.isEditMode() && this.userId()) {
      this.store.dispatch(updateUser({ id: this.userId(), updatedUser: user }));
    } else {
      const userId = uuidv4();
      this.store.dispatch(addUser({ user: { id: userId, ...user } }));
      this.resetForm();
    }
    this.router.navigate(['/users-list']);
  }
  resetForm() {
    this.userForm.reset();
    this.customUploaderReset.set(true);
  }
}
