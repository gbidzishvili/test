import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styles: [
    `
      .tooltip {
        position: absolute;
        padding: 5px 10px;
        color: lightgray;
        z-index: 100;
        background-color: #2c2d30;
        color: #fff;
        border-radius: 5px;
        transform: translateX(-50%);
        font-size: 12px;
        white-space: nowrap;
        margin-top: 5px;
        pointer-events: none;
      }
    `,
  ],
})
export class TooltipComponent implements AfterViewInit, OnInit {
  @Input() text = '';
  @Input() left = 0;
  @Input() top = 0;
  @ViewChild('tooltipContainer', { static: true })
  tooltipContainer!: ElementRef;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const tooltipElement = this.tooltipContainer.nativeElement;
    const tooltipWidth = tooltipElement.offsetWidth;

    // Adjust the `left` position if the tooltip is overflowing
    const adjustment = Math.floor(tooltipWidth / 2);
    if (adjustment > this.left) {
      this.left += adjustment - this.left + 1; // Adjust the position
      tooltipElement.style.left = `${this.left}px`;
    } else if (adjustment + this.left >= window.innerWidth - 2) {
      tooltipElement.style.right = `${-adjustment}px`;
      tooltipElement.style.left = null;
    }
  }
}
