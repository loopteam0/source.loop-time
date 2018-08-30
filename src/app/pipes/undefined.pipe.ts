import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'undefined'
})
export class UndefinedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      let val = value;
	  let newVal = val.replace(/:|-/g, ' ');
	  

    return newVal;
  }

}
