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
      url: "api/user",
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

var refreshUsers = function() {
  createUserAPI.getUsers().then(function(data) {
    var $users = data.map(function(user) {
      var $a = $("<a>")
        .text(user.name)
        .attr("href", "/user/" + user.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": user.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $userList.empty();
    $userList.append($users);
  });
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    name: $userName.val().trim(),
    email: $emailAddress.val().trim(),
    password: $password.val().trim()
  };
  console.log("hitting");
  console.log(newUser);
  if (!(newUser.name && newUser.email && newUser.password)) {
    alert("You must enter all fields!");
    return;
  }

  createUserAPI.saveUser(newUser).then(function() {
    refreshUsers();
  });

  $userName.val("");
  $emailAddress.val("");
  $password.val("");
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

/*$(document).ready(function() {
  $("#login").submit(function() {
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
});*/
