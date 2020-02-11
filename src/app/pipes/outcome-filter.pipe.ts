import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outcomeFilter'
})
export class OutcomeFilterPipe implements PipeTransform {

  transform(value: any, filter: any, args?: any): any {
    const audits = [];
    for (const audit of value) {
      if (!audit.outcomeCode || filter[audit.outcomeCode]) {
        audits.push(audit);
      }
    }
    return audits;
  }

}
