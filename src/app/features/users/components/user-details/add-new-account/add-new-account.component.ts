import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-account',
  standalone: true,
  imports: [],
  templateUrl: './add-new-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewAccountComponent {
  closeBtnClicked = output<void>();
  private dialogRef = inject(MatDialogRef<AddNewAccountComponent>);
  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close();
  }
}
