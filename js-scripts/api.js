'use strict';

const api = (function () {

  const baseURL = 'https://thinkful-list-api.herokuapp.com/marlon';

  const getBookmarks = function () {
    return fetch(`${baseURL}/bookmarks`);
  };

  const createBookmark = function (title, url, desc, rating) {
    let newBookmark = JSON.stringify({
      title,
      url,
      desc,
      rating,
    });

    return fetch(`${baseURL}/bookmarks`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: newBookmark
    })
      .then(res => {
        if (res.ok){
          return res;
        }
        throw new Error (res.statusText);
      })    
      .catch(error => alert('Enter a completed form'));

  };

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
    deleteBookmark,
  };
}());