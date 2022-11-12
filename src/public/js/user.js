$(() => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user form local storage: ", user);
    if (user) {
      if (user.isAdmin) {
        $("#tooltip-body").append(
          '<tr><td><a href="/stats">Statistics</a></td></tr>'
        );
      }
    }
  } catch (error) {}
});

$("#loginForm").submit(function (e) {
  e.preventDefault();

  var form = $(this);
  var actionUrl = form.attr("action");

  $("#loginError").hide();
  var signinBtn = $("#loginSubmitBtn")[0];
  signinBtn.value = "Loading...";
  signinBtn.disabled = true;

  $.ajax({
    type: "POST",
    url: actionUrl,
    data: form.serialize(),
    success: ({ status, user }) => {
      if (status == "success") {
        localStorage.setItem("user", JSON.stringify(user));
        location.reload();
      } else {
        $("#loginError").show();
        signinBtn.value = "Sign In";
        signinBtn.disabled = false;
      }
    },
    error: (error) => {
      $("#loginError").show();
      signinBtn.value = "Sign In";
      signinBtn.disabled = false;
    },
  });
});

$("#addUser").submit(function (e) {
  e.preventDefault();

  var form = $(this);
  var actionUrl = form.attr("action");

  console.log(form.serialize());
  $.ajax({
    type: "POST",
    url: actionUrl,
    data: form.serialize(),
    success: (data) => {
      if (data.status == "success") {
        location.replace("/");
      }
    },
    error: (error) => {
      $("#loginError").show();
      signinBtn.value = "Sign In";
      signinBtn.disabled = false;
    },
  });
});
