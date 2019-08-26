'use strict';

/* eslint-disable no-undef */

const Store = (function(){

  const addtoBookmarkStore = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  return {
    bookmarks: [],
    addtoBookmarkStore,
  };

}());