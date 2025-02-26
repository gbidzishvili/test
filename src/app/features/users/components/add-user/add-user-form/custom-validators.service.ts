import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  isEnglish = signal<boolean | null>(null);

  onInputChange(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
  onInputStringChange(event: any): void {
    const currentValue = event.target.value;
    if (this.isEnglish() === null) {
      if (/^[a-zA-Z]/.test(currentValue[0])) {
        this.isEnglish.set(true);
      } else if (/^[ა-ჰ]/.test(currentValue[0])) {
        this.isEnglish.set(false);
      }
    }
    if (this.isEnglish()) {
      event.target.value = currentValue.replace(/[^a-zA-Z]/g, '');
    } else if (this.isEnglish() === false) {
      event.target.value = currentValue.replace(/[^ა-ჰ]/g, '');
    }
  }
}
