function removeItemFromList(id) {
  $.ajax({
    url: "/wishlist/remove",
    type: "POST",
    data: { itemId: id },
    success: function (data) {
      if (data.success) {
        $(`#${id}`).remove();
      }
    },
    error: function (error) {
      console.log("could not clear wishlist: ", error);
    },
  });
}
function addItemToCart(itemId) {
  $.ajax({
    url: "/cart/add",
    type: "POST",
    data: { productId: itemId },
    success: function (data) {
      if (data.success) {
        $(`#${itemId}`).remove();
      }
    },
    error: function (error) {
      console.log("could not clear wishlist: ", error);
    },
  });
}
