import { Injectable } from '@angular/core';

@Injectable()
export class CollectionUtil {
  /**
   * Returns true if there is a list element and element parameter that
   * satisfies the callback function
   *
   * @param {any} list    list to check if the element exist in it
   * @param {any} element element to check existence
   * @param {(e1: any, e2: any) => boolean} cb callback function
   * @returns {boolean} true if exist such element
   * @memberof CollectionUtil
   */
  public exists(list, element, cb: (e1: any, e2: any) => boolean): boolean {
    return list.filter((eachElement) => cb(eachElement, element)).length > 0;
  }


}
