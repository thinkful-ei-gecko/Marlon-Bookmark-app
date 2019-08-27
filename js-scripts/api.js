'use strict';

const api = (function () {

  const baseURL = 'https://thinkful-list-api.herokuapp.com/marlon';
  const getBookmarks = function () {
    return fetch(`${baseURL}/bookmarks`);
  };

  const createBookmark = function (title, url, description, rating) {
    let newBookmark = JSON.stringify({
      title,
      url,
      description,
      rating,
      id: cuid()
    });

    return fetch(`${baseURL}/bookmarks`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: newBookmark
    });

  };
  //   const updateBookmark = function(name){

  //   };

  const deleteBookmark = function (id) {
    return fetch (`${baseURL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return {
    getBookmarks,
    createBookmark,
    //updateBookmark,
    deleteBookmark,
  };
}());