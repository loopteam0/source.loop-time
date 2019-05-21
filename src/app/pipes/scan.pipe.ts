import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scan'
})
export class ScanPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace('&amp;', args)
  }

}
