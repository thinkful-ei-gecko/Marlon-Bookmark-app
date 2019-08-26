'use strict';


const bookmarkList = (function () {

  const generateBookmark = function (bookmark) {
    return `
    <div class = "bookmark-element">
     <h2 class = "bookmark-title">${bookmark.title}</h2>
     <a href = "${bookmark.websiteURL}" class = "bookmark-url"></a>
     <h3>${bookmark.description}</h3>
     <p class = "bookmark-description"></p>
     <button type = "click" class = "remove-bookmark">Remove</button>
     <button type = "submit" class = "edit-bookmark">Edit</button>
    </div>`;
  };


  const handleAddBookmark = function(bookmark){
      $('#add-bookmark').on('submit' => 
        event.preventDefault();
        Store.addtoBookmarkStore(bookmark);
      );
  };

  return {
      generateBookmark,
      handleAddBookmark,
  }

}());