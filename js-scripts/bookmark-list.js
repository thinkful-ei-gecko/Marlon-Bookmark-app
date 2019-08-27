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

  // const generateAddBookmarkForm = function() {
  //   return `
  //   <form class = "add-bookmark-form">
  //   <fieldset class = "bookmark-form-display">
  //     <div class = "add-input-container title">
  //      <label for = "input-bookmark-title">Title</label>
  //      <input type = "text" class = "input-bookmark-title" placeholder= "Enter a title">
  //     </div>
  //      <div class = "add-input-container URL">
  //      <label for = "input-bookmark-URL">Website URL</label>
  //     <input type = "text" class = "input-bookmark-URL" placeholder = "Enter the website URL">
  //     </div>
  //    <div class = "add-input-container title">
  //      <label for = "input-bookmark-description">Description</label>
  //      <input type = "text" class = "input-site-description" placeholder = "Enter a description">
  //    </div>
  //    <div class = "add-input-container rating">
  //      <label for "input-container rating">Rating</label>
  //      <input type = "number" class = "input-bookmark-rating" min = "1" max = "5" placeholder = "1-5">
  //    </div>
  //    <div class = add-button-container>
  //     <button type = 'click' button class = "add-bookmark-button" id = "add-bookmark-cancel">Cancel</button>
  //     <button type = 'submit' button class = "add-bookmark-button" id = "add-bookmark-submit">Submit</button>
  //    </div>
  //   </fieldset>
  // </form>`;
  // };
    
  const generateBookmarkElement = function (bookmark) {
    return `
     <li class = "bookmark-list-element">
     ${bookmark.title}
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

  //   const filterByStars = function(num){
  //     Store.bookmarks.filter(bookmark => bookmark.rating > num); 
  //   };

  //   const handleFilterByStars = function(num){
         
  //   };

  const inititalizeEventListners = function(){
    handleAddBookmarkSubmit();
    handleAddBookmark();
    handleAddBookmarkCancel();
  };


  return {
    inititalizeEventListners,
    render,
  };

}());


console.log('Test');