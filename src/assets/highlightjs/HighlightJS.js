/// <reference path='./HighlightJS.d.ts' />

import hljs from './highlight.pack';

export let HighlightJS = (function() {

  function HighlightJS () {
    this._hljs = hljs;
  }

  HighlightJS.prototype.initHighlightingOnLoad = function () {
    return this._hljs.initHighlightingOnLoad();
  };

  HighlightJS.prototype.highlightBlock = function(block) {
    return this._hljs.highlightBlock(block);
  };

  HighlightJS.prototype.initHighlighting = function () {
    return this._hljs.initHighlighting();
  };

  return HighlightJS;

}());
