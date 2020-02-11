import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {HighlightJS} from 'assets/highlightjs/HighlightJS';
declare const $: any;

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() data: any;
  private initialized: boolean;

  private hljs = new HighlightJS();
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.hljs.highlightBlock($(this.el.nativeElement)[0]);
      // this.initialized = true;
    }, 50);
  }

}
