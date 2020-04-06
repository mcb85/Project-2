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
      url: "api/blog",
      data: JSON.stringify(post)
    });
  },
  getPosts: function() {
    return $.ajax({
      url: "api/blog",
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

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deletePosts(idToDelete).then(function() {
    refreshPosts();
  });
};

$submitBtn.on("click", handleFormSubmit);
$blogList.on("click", ".delete", handleDeleteBtnClick);

var $userName = $("#user-name");
var $emailAddress = $("#email-address");
var $password = $("#password");
var $saveBtn = $("#save");
var $userList = $("#user-list");

var createUserAPI = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/signup",
      data: JSON.stringify(user)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/user",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/user/" + id,
      type: "DELETE"
    });
  }
};

// var refreshUsers = function() {
//   createUserAPI.getUsers().then(function(data) {
//     var $users = data.map(function(user) {
//       var $a = $("<a>")
//         .text(user.name)
//         .attr("href", "/user/" + user.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": user.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $userList.empty();
//     $userList.append($users);
//   });
// };

var handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    name: $userName.val().trim(),
    email: $emailAddress.val().trim(),
    password: $password.val().trim()
  };
  console.log(newUser);
  if (!(newUser.name && newUser.email && newUser.password)) {
    alert("You must enter all fields!");
    return;
  }

  createUserAPI.saveUser(newUser);

  // $userName.val("");
  // $emailAddress.val("");
  // $password.val("");
};

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  createUserAPI.deleteUser(idToDelete).then(function() {
    refreshUsers();
  });
};

$saveBtn.on("click", handleFormSubmit);
$userList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function() {
  $("#login").submit(function() {
    event.preventDefault();
    console.log("login");
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        emailAddress: $("#inputEmail").val(),
        password: $("#inputPassword").val()
      },
      success: function(result) {
        if (!result) {
          console.log("success!");
          console.log(emailAddress && password);
          //$('form input[name="username"]').css("background-color", "red");
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }
    });

    return false;
  });
});
