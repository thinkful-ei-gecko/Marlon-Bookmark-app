'use strict';

/* eslint-disable no-undef */

const Store = (function(){

  const addtoBookmarkStore = function(bookmark){
    this.bookmarks.push(Bookmark.createLocalBookmark(bookmark));
  };

  const findByID = function(id){
    return Store.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };
    
  
  return {
    bookmarks: [],
    addingBookmark: false,
    filteringBookmarks: false,
    addtoBookmarkStore,
    findByID,
    findAndDelete,
  };

}());