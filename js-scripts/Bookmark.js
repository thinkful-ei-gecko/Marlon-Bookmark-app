'use strict';
/* eslint-disable no-undef */

const Bookmark = (function(){

  const createLocalBookmark = function(bookmark){

    return {
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      rating: bookmark.rating,
      id: bookmark.id,
      expandedView: false,
      isEditing: false,
      isHidden: false,
    };
  };
  return{
    createLocalBookmark,
  };
}());