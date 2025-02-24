import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() tooltipText: any = '';
  private tooltipComponent?: ComponentRef<any>;
  private pressTimeout?: any;
  private pressDuration = 300;
  private isDesktop(): boolean {
    return window.innerWidth > 768;
  }
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.tooltipComponent) {
      return;
    }
    this.pressTimeout = setTimeout(() => {
      const tooltipComponentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.tooltipComponent = tooltipComponentFactory.create(this.injector);
      this.document.body.appendChild(
        this.tooltipComponent.location.nativeElement
      );
      this.setTooltipComponentProperties();
      this.tooltipComponent.hostView.detectChanges();
    }, this.pressDuration);
    event.preventDefault();
  }
  @HostListener('touchend')
  @HostListener('mouseup')
  onPressEnd() {
    if (this.pressTimeout) {
      clearTimeout(this.pressTimeout);
      this.pressTimeout = undefined;
    }
    if (!this.tooltipComponent) {
      return;
    }
    if (this.tooltipComponent) {
      this.appRef.detachView(this.tooltipComponent.hostView);
      this.tooltipComponent = undefined;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.tooltipComponent || !this.isDesktop()) {
      return;
    }
    const tooltipComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipComponentFactory.create(this.injector);
    this.document.body.appendChild(
      this.tooltipComponent.location.nativeElement
    );
    this.setTooltipComponentProperties();
    this.tooltipComponent.hostView.detectChanges();
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.tooltipComponent || !this.isDesktop()) {
      return;
    }
    this.appRef.detachView(this.tooltipComponent.hostView);
    this.tooltipComponent = undefined;
  }

  private setTooltipComponentProperties() {
    if (!this.tooltipComponent) {
      return;
    }
    this.tooltipComponent.instance.text = this.tooltipText;
    const { left, right, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponent.instance.left = (right - left) / 2 + left;
    this.tooltipComponent.instance.top = bottom;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
}
