import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-uploader',
  standalone: true,
  imports: [],
  templateUrl: './custom-uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomUploaderComponent,
      multi: true,
    },
  ],
})
export class CustomUploaderComponent implements ControlValueAccessor {
  @Input()
  set customUploaderReset(value: boolean) {
    if (value === true) {
      this.imageUrl.set('');
    }
  }
  uploader = viewChild('uploader', { read: ElementRef<any> });
  imageUrl = signal<any>('');
  formData: any;
  onChange = (value: any) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    // this.fileName = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onClick() {
    this.uploader()!.nativeElement.click();
  }
  edit() {
    this.onClick();
  }
  delete() {
    this.imageUrl.set('');
  }

  log(event: Event) {
    const filefileInputElement = event.target as HTMLInputElement;
    if (filefileInputElement.files && filefileInputElement.files[0]) {
      var reader = new FileReader();
      reader.onloadend = () => {
        var baseStringResult = reader.result as string;
        const imageUrl = baseStringResult;
        this.imageUrl.set(imageUrl);
        this.onChange(this.imageUrl());
        filefileInputElement.value = '';
      };
      reader.readAsDataURL(filefileInputElement.files[0]);
    }
    this.onTouched();
  }
}
