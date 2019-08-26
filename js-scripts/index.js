'use strict';
/* eslint-disable no-undef */

$(document).ready(function(){
  api.getBookmarks()
    .then (res => res.json())
    .then(bookmarks => {
      bookmarks.forEach(bookmark => Store.addtoBookmarkStore(bookmark));
    });
    
});