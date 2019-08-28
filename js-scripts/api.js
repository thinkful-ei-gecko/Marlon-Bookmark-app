'use strict';

const api = (function () {

  const baseURL = 'https://thinkful-list-api.herokuapp.com/marlon';

  const listApiFetch = function(...args){
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok){
          error = {code: res.status};
        }    
        if (!res.headers.get('content-type').includes('json')){
          error.message = res.statusText;
          return Promise.reject(error);
        }

        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data;
      });
  };


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
    });

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