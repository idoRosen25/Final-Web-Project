function toggleTooltip() {
  var tooltip = document.getElementById("tooltip");
  tooltip.classList.toggle("d-none");
}

$(() => {
  console.log("all user logout links: ", $(".logoutUser"));

  if ($(".logoutUser").length > 0) {
    $(".logoutUser").click((e) => {
      e.preventDefault();
      $.ajax({
        url: "/user/logout",
        type: "GET",
        success: (data) => {
          localStorage.clear();
          location.reload();
        },
      });
    });
  }
});
