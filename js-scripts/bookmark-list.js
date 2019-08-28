'use strict';


const bookmarkList = (function () {


  const render = function(){
    let bookmarks = [...Store.bookmarks];

    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= Store.filterByRating);

    if (Store.addingBookmark === true){
      $('.add-bookmark-form').css('visibility','visible');
    }
    if (Store.addingBookmark === false){
      $('.add-bookmark-form').css('visibility','hidden');
    }

    $('.bookmark-list').html(generateBookmarksString(bookmarks));

  };
    

  const generateBookmarkElement = function (bookmark) {
    if (bookmark.expandedView === true){
      return `
     <li class = "bookmark-list-element">
      <button type = "button" data-id="${bookmark.id}" class = "bookmark-element-expand">${bookmark.title} ${bookmark.rating}</button>
      <section class = "bookmark-expanded-view">
      <h2>Website URL</h2>
      <p>${bookmark.url}</p>
      <h2>Description</h2>
      <p>${bookmark.description}</p>
      <button id = "bookmark-element-delete" data-id="${bookmark.id}">Remove</button>
      </section>
     </li>`;
    }
    return `
    <li class = "bookmark-list-element">
     <button type = "button" data-id="${bookmark.id}" class = "bookmark-element-expand">${bookmark.title} ${bookmark.rating}</button>
    </li>`;
  };

  const generateBookmarksString = function(bookmarks){
    return bookmarks.map(bookmark => generateBookmarkElement(bookmark)).join('');
  };

  const handleAddBookmark = function(){
    $('.button-options').on('click', '#add-bookmark', event => {
      Store.addingBookmark = true;
      render();
    });
  };

  const handleAddBookmarkCancel = function(){
    $('.add-bookmark-form').on('click', '#add-bookmark-cancel', event => {
      Store.addingBookmark = false;
      $('.input-bookmark-title').val('');
      $('.input-bookmark-URL').val('');
      $('.input-bookmark-description').val('');
      $('.input-bookmark-rating').val('');
      render();
    });
  };

  const handleAddBookmarkSubmit = function (){
    $('.add-bookmark-form').on('submit', () => {
      event.preventDefault();
      console.log('Submit ran!');
      let bookmarkTitle = $('.input-bookmark-title').val();
      let bookmarkURL = $('.input-bookmark-URL').val();
      let bookmarkDescription = $('.input-bookmark-description').val();
      let bookmarkRating = $('.input-bookmark-rating').val();

      api.createBookmark(bookmarkTitle, bookmarkURL, bookmarkDescription, bookmarkRating)
        .then(res => res.json())
        .then(newBookmark => {
          Store.addtoBookmarkStore(newBookmark);
          render();
          Store.addingBookmark = false;
        });
    });
  };   

  const toggleExpandedView = function(bookmark){
    bookmark.expandedView = !bookmark.expandedView;
  };

  const handleToggleExpandedView = function(){
    $('.bookmark-list').on('click','.bookmark-element-expand', event => {
      let bookmarks = Store.bookmarks;
      let currentBookmark = Store.findByID($(event.currentTarget).data('id'));

      console.log(currentBookmark);
      toggleExpandedView(currentBookmark);
      
      console.log('Toggle view ran!');
      render();
    });
  };

  const handleDeleteBookmark = function(){
    $('.bookmark-list').on('click','#bookmark-element-delete', event => {
      console.log('Handle delete ran!');
      let currentID = $(event.currentTarget).data('id');
      console.log(currentID)
      api.deleteBookmark(currentID)
        .then(res => {
          Store.findAndDelete(currentID);
          render();
        });
    });
  };
  
  const filterByStars = function(num){
    let bookmarks = Store.bookmarks;
    return bookmarks.filter(bookmark => bookmark.rating <= num);
  };

  const handleFilterByStars = function(){
    $('.filter-by-stars').on('change', event => {
      console.log('Filter ran!');
      Store.filterByRating = $('.filter-by-stars').val();
   
      render();
    });
  };

  const inititalizeEventListeners = function(){
    handleAddBookmarkSubmit();
    handleAddBookmark();
    handleAddBookmarkCancel();
    handleToggleExpandedView();
    handleDeleteBookmark();
    handleFilterByStars();
  };


  return {
    inititalizeEventListeners,
    render,
  };

}());


