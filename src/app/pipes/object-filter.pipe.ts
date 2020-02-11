import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectFilter'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(value: any, filter: any, args?: any): any {
    const audits = [];
    if (!filter) { return value; }
    for (const audit of value) {
      if (!audit.object || filter[audit.object]) {
        audits.push(audit);
      }
    }
    return audits;
  }

}
