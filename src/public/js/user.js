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
    success: (data) => {
      if (data.status == "success") {
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
