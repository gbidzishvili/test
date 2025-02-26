import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }
}
