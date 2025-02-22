import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addUser,
  removeUser,
  updateUser,
} from '../../../../state/users/user.action';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, AddUserFormComponent],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {}
