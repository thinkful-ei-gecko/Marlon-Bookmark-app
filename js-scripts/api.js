'use strict';

const api = (function(){

  const baseURL = 'https://thinkful-list-api.herokuapp.com/marlon/';
  const getBookmarks = function(){
    return fetch (`${baseURL}/bookmarks`);
  };
  const createBookmark = function(title, URL, description){

    let newBookmark = JSON.stringify({
      title,
      URL,
      description,
    });

    return fetch(`${baseURL}/bookmarks`,
      {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: newBookmark
      });

  };
  //   const updateBookmark = function(name){

  //   };

  const deleteBookmark = function(name){

  };

  return {
    getBookmarks,
    createBookmark,
    //updateBookmark,
    deleteBookmark,
  };
}());

