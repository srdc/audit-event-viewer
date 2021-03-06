import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Selective Preloading Strategy
 */
@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  /**
   * Array of preloaded modules
   * @type {Array}
   */
  preloadedModules: string[] = [];

  /**
   * Preload Module
   * @param route
   * @param load
   * @returns {Observable<any>}
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // add the route path to our preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log('Preloaded: ' + route.path);

      return load();
    } else {
      return Observable.of(null);
    }
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
