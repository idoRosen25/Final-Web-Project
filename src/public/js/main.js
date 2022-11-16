function toggleTooltip() {
  var tooltip = document.getElementById("tooltip");
  tooltip.classList.toggle("d-none");
}

$(() => {
  if ($(".logoutUser").length > 0) {
    $(".logoutUser").click((e) => {
      e.preventDefault();
      $.ajax({
        url: "/user/logout",
        type: "GET",
        success: (data) => {
          localStorage.clear();
          window.location.href = "/";
        },
      });
    });
  }
});
