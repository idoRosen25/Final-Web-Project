$(() => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.isAdmin) {
        $("#tooltip-body").append(
          '<tr><td><a href="/stats">Statistics</a></td></tr>'
        );
      }
    }
  } catch (error) {}

  if ($("#isAdminInput")[0]) {
    $("#isAdminInput")[0].checked =
      JSON.parse(localStorage.getItem("user"))?.isAdmin &&
      !window.location.href.includes("add-user");
  }
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
        if (window.location.href.includes("error")) {
          window.location.href = "/";
        } else {
          location.reload();
        }
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
  $('button[type="submit"]').prop("disabled", true);
  var form = $(this);
  var actionUrl = form.attr("action");
  var method = form.attr("method");
  console.log(method);
  $.ajax({
    type: method,
    url: actionUrl,
    data: form.serialize(),
    success: (data) => {
      console.log("data: ", data);
      if (method.toLowerCase() == "put") {
        $("#update-success").toggleClass("d-none");

        setTimeout(() => {
          $("#update-success").toggleClass("d-none");
        }, 1500);
      } else {
        location.href = "/";
      }
      $('button[type="submit"]').prop("disabled", false);
    },
    error: (error) => {
      console.log("couldnt send /user req type: " + method);
      $('button[type="submit"]').prop("disabled", false);
    },
  });
});
