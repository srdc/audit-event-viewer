import {Directive, ElementRef, OnInit} from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    $(this.el.nativeElement).dropdown();
  }

}
