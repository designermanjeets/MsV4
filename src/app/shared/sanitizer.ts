import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export  class SanitizeHtml implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer){}  

   transform(v: any) : SafeHtml {
      return this._sanitizer.bypassSecurityTrustHtml(v); 
   } 
}