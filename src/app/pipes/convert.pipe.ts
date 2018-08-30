import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {

  parsed;
  newValue;

  transform(value: any, args?: any): any {
  this.parsed =  parseInt(value , 10);
  this.newValue = Math.floor( this.parsed * 1e-6);

    return this.newValue + `MB`;
  }

}
