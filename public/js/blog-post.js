// Get references to page elements
var $blogPostTitle = $("#blog-post-title");
var $blogPost = $("#blog-post");
var $submitBtn = $("#submitPost");
var $blogList = $("#blogPost-list");
var $userId = $("#userId");

// The API object contains methods for each kind of request we'll make
var API = {
  savePost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  getPosts: function() {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deletePosts: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

var refreshPosts = function() {
  API.getPosts().then(function(data) {
    console.log(data);
    var $posts = data.map(function(post) {
      var $a = $("<a>")
        .text(post.title)
        .attr("href", "/posts/" + post.id);
      console.log(post);

      /*var $userId = $("#userId")
        .attr({
          value: post.UserId
        });
      $userId;*/

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": post.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $blogList.empty();
    $blogList.append($posts);
  });
};

var handlePostSubmit = function(event) {
  console.log("test");
  event.preventDefault();
  var post = {
    UserId: $userId.val().trim(),
    title: $blogPostTitle.val().trim(),
    body: $blogPost.val().trim()
  };

  console.log(post.UserId && post.title && post.body);
  if (!(post.title && post.body)) {
    alert("You must enter a title and post!");
    return;
  }

  API.savePost(post).then(function() {
    refreshPosts();
  });

  $blogPostTitle.val("");
  $blogPost.val("");
};

var handleDelete = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletePosts(idToDelete).then(function() {
    refreshPosts();
  });
};

$submitBtn.on("click", handlePostSubmit);

$blogList.on("click", ".delete", handleDelete);
