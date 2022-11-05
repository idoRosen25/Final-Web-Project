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
      } else {
        alert("item added");
      }
    },
    error: function (error) {
      alert("item not added to cart");
    },
  });
}

function addItemToWishlist(itemId) {
  $.ajax({
    url: "/wishlist/add",
    type: "POST",
    data: { itemId },
    success: function (data) {
      alert("item added to wishlist");
    },
    error: function (error) {
      alert("item not added to wishlist");
    },
  });
}

$("#productForm").submit(function (e) {
  e.preventDefault();

  var form = $(this);
  var actionUrl = form.attr("action");


  $.ajax({
    type: "POST",
    url: actionUrl,
    data: form.serialize(),
   
    error: (error) => {
     console.log('error on add product: ',error)
    },
  });
});

