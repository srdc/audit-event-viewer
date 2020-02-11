import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agentFilter'
})
export class AgentFilterPipe implements PipeTransform {

  transform(value: any, filter: any, args?: any): any {
    const audits = [];
    if (!filter) { return value; }
    for (const audit of value) {
      if (filter[audit.requestor]
        && filter[audit.triggeringSystem]
        && filter[audit.targetSystem]) {
        audits.push(audit);
      }
    }
    return audits;
  }

}
