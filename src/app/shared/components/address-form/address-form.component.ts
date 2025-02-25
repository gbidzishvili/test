// address-form.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,

  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
      deps: [],
    },
  ],
})
export class AddressFormComponent {
  title = input<string>('');
  controlKey = input<string>('');
  perentContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  get parentFormGroup() {
    return this.perentContainer.control as FormGroup;
  }
  ngOnInit() {
    this.dynamicallyAddFormGroupToParent();
  }
  dynamicallyAddFormGroupToParent() {
    this.parentFormGroup.addControl(
      this.controlKey(),
      this.fb.group({
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
      })
    );
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey());
  }
}
