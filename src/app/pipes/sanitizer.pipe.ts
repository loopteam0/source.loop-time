import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  /* transform(value: any, args?: any): any {
    return null;
  } */
  constructor(public sanitizer: DomSanitizer) {}
  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

     return this.sanitizer.bypassSecurityTrustStyle(value);

  }
}
