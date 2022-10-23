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
