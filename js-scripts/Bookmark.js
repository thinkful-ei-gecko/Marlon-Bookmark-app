'use strict';
/* eslint-disable no-undef */

const Bookmark = (function(){

  const create = function(title, URL, description, rating ){
    return {
      title,
      URL,
      description,
      rating,
      expandedView: false,
      isEditing: false,
    };
  };
  return{
    create,
  };
}());