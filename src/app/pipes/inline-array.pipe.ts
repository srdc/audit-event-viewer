import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inlineArray'
})
export class InlineArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    if (!value || !value.length) {
      return value;
    } else if (value.length > 0) {
      result += value[0];
      for (let i = 1; i < value.length; i++) {
        result += ' | ' + value[i];
      }
    }
    return result;
  }

}
