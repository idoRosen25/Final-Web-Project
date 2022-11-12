$(() => {
  $("#overlay-dismiss-btn").click(() => {
    $("#overlay").toggleClass("d-none");
  });
});

$(".category-tab").map((index, ele) => {
  ele.addEventListener("click", (e) => {
    const isActive = e.target.className.includes("active");

    if (isActive) return;

    $(".active")[0].className = $(".active")[0]
      .className.split(" ")
      .filter((className) => className != "active")
      .join(" ");
    e.target.className += " active";
  });
});

function addItemToCart(itemId) {
  $.ajax({
    url: "/cart/add",
    type: "POST",
    data: { productId: itemId },
    success: function (data) {
      if (typeof data == "string") {
        window.location.href = "/";
      }
    },
    error: function (error) {},
  });
}

function addItemToWishlist(itemId) {
  $.ajax({
    url: "/wishlist/add",
    type: "POST",
    data: { itemId },
    success: function (data) {},
    error: function (error) {},
  });
}
