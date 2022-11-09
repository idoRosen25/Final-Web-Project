function removeItemFromCart(itemId) {
  $.ajax({
    type: "DELETE",
    url: "/cart/remove",
    data: { itemId },
    success: ({ status, cart }) => {
      if (status == "success") {
        $(`#${itemId}`)[0].remove();
        if (cart.products.length == 1) {
          $(`#checkoutBtn`).remove();
        }
      }
    },
    error: (error) => {
      alert("Error removing item from cart: " + error);
    },
  });
}
