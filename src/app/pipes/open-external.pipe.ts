import { Pipe, PipeTransform } from '@angular/core';
// import { shell } from 'electron';
// import * as fs from 'fs';

@Pipe({
  name: 'openExternal'
})
export class OpenExternalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const url = value;
    // return shell.openExternal(url);
  }

}
