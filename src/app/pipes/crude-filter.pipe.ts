import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crudeFilter'
})
export class CrudeFilterPipe implements PipeTransform {

  transform(value: any, filter: any, args?: any): any {
    const arr = [];
    // console.log(value);
    for (const audit of value) {
      // console.log(audit.actionCode, filter[audit.actionCode]);
      if (!filter.hasOwnProperty(audit.actionCode) || filter[audit.actionCode]) {
        arr.push(audit);
      }
    }
    return arr;
  }

}
