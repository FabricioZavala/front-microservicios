import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[ellipsisOverflow]'
})
export class EllipsisOverflowDirective implements OnInit {
  @Input() maxWidth: number = 150;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyEllipsis();
  }

  private applyEllipsis() {
    const maxWidthString = `${this.maxWidth}px`;
    this.renderer.setStyle(this.el.nativeElement, 'text-overflow', 'ellipsis');
    this.renderer.setStyle(this.el.nativeElement, 'max-width', maxWidthString);
    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }
}
