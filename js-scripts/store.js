'use strict';

/* eslint-disable no-undef */

const Store = (function(){

  const addtoBookmarkStore = function(bookmark){
    this.bookmarks.push(Bookmark.createLocalBookmark(bookmark));
  };

  return {
    bookmarks: [],
    addingBookmark: false,
    filteringBookmarks: false,
    addtoBookmarkStore,
  };

}());