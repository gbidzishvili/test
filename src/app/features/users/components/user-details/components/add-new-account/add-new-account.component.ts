import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { AccountsService } from '../../services/accounts.service';
import { addAccount } from '../../../../../../state/users/user.action';
import { User } from '../../../../models/user.model';
import { Account } from '../../../../models/account.model';
import { FacadeUsersService } from '../../../../../../core/services/facade-users.service';

@Component({
  selector: 'app-add-new-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewAccountComponent {
  facadeUsersService = inject(FacadeUsersService);
  accountForm!: FormGroup;
  fb = inject(FormBuilder);
  closeBtnClicked = output<void>();
  private dialogRef = inject(MatDialogRef<AddNewAccountComponent>);
  store = inject(Store);
  route = inject(ActivatedRoute);
  accountService = inject(AccountsService);

  ngOnInit(): void {
    this.initForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  initForm() {
    this.accountForm = this.fb.group({
      type: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      status: ['active', [Validators.required]],
    });
  }
  onSubmit() {
    const account = this.getAccount();
    if (this.accountForm.valid) {
      this.addAccount(account);
      this.closeDialog();
    }
  }
  getAccount() {
    const accountId = uuidv4().slice(0, 7);
    return {
      id: accountId,
      clId: this.accountService.userId(),
      ...this.accountForm.value,
    };
  }
  addAccount(account: Account) {
    this.facadeUsersService.addAccount(account);
  }
}
