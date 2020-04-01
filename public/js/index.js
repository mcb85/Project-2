// Get references to page elements
var $blogPostTitle = $("#blog-post-title");
var $blogPost = $("#blog-post");
var $submitBtn = $("#submit");
var $blogList = $("#blogPost-list");

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
    var $posts = data.map(function(post) {
      var $a = $("<a>")
        .text(post.title)
        .attr("href", "/post/" + post.id);

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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var post = {
    $title: $blogPostTitle.val().trim(),
    $blog: $blogPost.val().trim()
  };
  if (!(post.title && post.blog)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.savePost(post).then(function() {
    refreshPosts();
  });

  $blogPostTitle.val("");
  $blogPost.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletePosts(idToDelete).then(function() {
    refreshPosts();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$blogList.on("click", ".delete", handleDeleteBtnClick);

var $userName = $("#user-name");
var $emailAddress = $("#email-address");
var $password = $("#password");
var $saveBtn = $("#save");
var $userList = $("#user-list");

// The API object contains methods for each kind of request we'll make
var createUserAPI = {
  saveUser: function(User) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(User)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  deleteUsers: function(id) {
    return $.ajax({
      url: "api/users/" + id,
      type: "DELETE"
    });
  }
};

var refreshUsers = function() {
  createUserAPI.getUsers().then(function(data) {
    var $User = data.map(function(User) {
      var $a = $("<a>")
        .text(User.name)
        .attr("href", "/user/" + User.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": User.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $userList.empty();
    $userList.append($User);
  });
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    $username: $userName.val().trim(),
    $email: $emailAddress.val().trim(),
    $password: $password.val().trim()
  };
  if (!(newUser.username && newUser.email && newUser.password)) {
    alert("You must enter all fields!");
    return;
  }

  createUserAPI.saveUsers(User).then(function() {
    refreshUsers();
  });

  $userName.val("");
  $emailAddress.val("");
  $password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the user from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  createUserAPI.deleteUsers(idToDelete).then(function() {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons
$saveBtn.on("click", handleFormSubmit);
$userList.on("click", ".delete", handleDeleteBtnClick);


