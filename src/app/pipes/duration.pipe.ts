import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

 time;


  transform(value: any, args?: any): any {

    if ( isNaN(value)) {
      this.time = value;

    // tslint:disable-next-line:curly
    } else if (!isNaN(value ) && value === 0 ) {
      this.time = `N/A`;

    } else {
      const hours = Math.trunc( value / 60 );
      const mins = value % 60;
      this.time = `${hours}h ${mins}min`;

    }
    return this.time;
  }

}
