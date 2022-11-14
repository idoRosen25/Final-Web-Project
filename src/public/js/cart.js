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

function updateQuantityInCart(event, productId) {
  const quantity = event.value;

  if (quantity <= 0) {
    removeItemFromCart(productId);
    return;
  }

  $.ajax({
    type: "PUT",
    url: "/cart/update-quantity",
    data: { productId, quantity },
    success: ({ status, item }) => {
      if (status == "success" && item) {
        const chosenItem = item.products.find(
          (item) => item.productId._id == productId
        );
        $(`#total-${productId}`).text(
          chosenItem.productId.price * chosenItem.quantity + " $"
        );
        event.defaultValue = chosenItem.quantity;
      }
    },
  });
}
