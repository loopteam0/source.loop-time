import { Directive, ElementRef,Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit{
  
  constructor(private el: ElementRef) {
    
  }
  


  ngOnInit(){
    console.log(this.el);
    
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.setImage('http://www.grup-pumsa.cat/uploadwallimgs/b/25/251429_tv-show-wallpapers.jpg')
  }
  
  private setImage(url){
    this.el.nativeElement.style.backgroud = url;

  }
}
