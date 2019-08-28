'use strict';


const bookmarkList = (function () {


  const render = function(){
    let bookmarks = [...Store.bookmarks];

    $('.bookmark-list').html(generateBookmarksString(bookmarks));

    if (Store.addingBookmark === true){
      $('.add-bookmark-form').css('visibility','visible');
    }
    else if (Store.addingBookmark === false){
      $('.add-bookmark-form').css('visibility','hidden');
    }

    console.log('Render ran!');
  };
    

  const generateBookmarkElement = function (bookmark) {
 
    return `
     <li class = "bookmark-list-element">
      <button type = "button" data-id="${bookmark.id}" class = "bookmark-element-expand">${bookmark.title} ${bookmark.rating}</button>
      <section class = "bookmark-expanded-view">
      <h2>Website URL</h2>
      <p>${bookmark.url}</p>
      <h2>Description</h2>
      <p>${bookmark.description}</p>
      <button id = "bookmark-element-edit" data-id="${bookmark.id}">Edit</button>
      <button id = "bookmark-element-delete" data-id="${bookmark.id}">Remove</button>
      </section>
     </li>`;

  };

  const generateBookmarksString = function(bookmarks){
    return bookmarks.map(bookmark => generateBookmarkElement(bookmark)).join('');
  };

  const handleAddBookmark = function(){
    $('.button-options').on('click', '#add-bookmark', () => {
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
        });
    });
  };   

  const toggleExpandedView = function(bookmark){
    bookmark.expandedView = !bookmark.expandedView;
    $('.bookmark-element-expand').toggleClass('active', true);
    $('.bookmark-element-expand').toggleClass('active', false);
  };

  const handleToggleExpandedView = function(){
    $('.bookmark-list').on('click','.bookmark-element-expand', event => {
      let bookmarks = Store.bookmarks;
      let currentBookmark = Store.findByID($(event.currentTarget).data('id'));

      console.log(currentBookmark);
      toggleExpandedView(currentBookmark);
      
      if(currentBookmark.expandedView === true){
        $('.bookmark-expanded-view').css('display', 'block');
      }
      else{
        $('.bookmark-expanded-view').css('display', 'none');
      }
      console.log('Toggle view ran!');
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
  //   const filterByStars = function(num){
  //     Store.bookmarks.filter(bookmark => bookmark.rating > num); 
  //   };

  //   const handleFilterByStars = function(num){
         
  //   };

  const inititalizeEventListners = function(){
    handleAddBookmarkSubmit();
    handleAddBookmark();
    handleAddBookmarkCancel();
    handleToggleExpandedView();
    handleDeleteBookmark();
  };


  return {
    inititalizeEventListners,
    render,
  };

}());


console.log('Test');