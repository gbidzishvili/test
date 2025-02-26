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

@Component({
  selector: 'app-add-new-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewAccountComponent {
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
    const accountId = uuidv4();
    const account = {
      id: accountId,
      clId: this.accountService.userId(),
      ...this.accountForm.value,
    };
    if (this.accountForm.valid) this.addAccount(account);

    this.closeDialog();
  }
  addAccount(account: Account) {
    this.store.dispatch(
      addAccount({
        account: account,
      })
    );
  }
}
