function removeItemFromCart(itemId) {
  $.ajax({
    type: "DELETE",
    url: "/cart/remove",
    data: { itemId },
    success: ({ status, product }) => {
      if (status == "success" && product.acknowledged) {
        $(`#${itemId}`).remove();
      } else {
        alert("Error removing item from cart");
      }
    },
    error: (error) => {
      alert("Error removing item from cart: " + error);
    },
  });
}
