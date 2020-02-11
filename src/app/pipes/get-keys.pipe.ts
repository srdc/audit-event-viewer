import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getKeys'
})
export class GetKeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keys = [];
    if (value) {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    return keys;
  }

}
