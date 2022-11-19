$(() => {
  $("#overlay-dismiss-btn").click(() => {
    $("#overlay").toggleClass("d-none");
  });
  if (window.location.href.includes("shop")) {
    if ($(`.general`)) {
      $(`.general`)[0].className += " active";
    }
    loadProductsForCategory("general");
  }
});

function loadProductsForCategory(category) {
  $.ajax({
    url: "/product/" + category,
    type: "GET",
    success: (data) => {
      const productContainer = $("#productContainer");
      productContainer.html("");
      if (data.items?.length) {
        for (let i = 0; i < data.items.length; i++) {
          productContainer.append(
            `<div id="${
              data.items[i]._id
            }" class="col-lg-3 col-md-4 col-sm-6 my-3">
            <div class="card">
              <div class="card-body">
                <img src="${
                  data.items[i].image
                }" class="card-img-top" alt="..." height="300px" />
                <h5 class="card-title capitalize mt-3">
                ${data.items[i].title}
                </h5>
                <p class="card-text">Price: ${data.items[i].price}$</p>
                ${
                  data.isAdmin
                    ? ` <div class="my-2">
                <a class="btn btn-warning pt-1 pb-2" href="/product/add/${data.items[i]._id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none"
                    stroke="white" stroke-width="1" class="bi bi-pencil">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>

                  </svg>
                </a>
                <button class="btn btn-danger" onclick="removeProduct('${data.items[i]._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-trash3" viewBox="0 0 16 16">
                <path
                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
                </button>
              </div>`
                    : ""
                }
                ${
                  data.loggedIn
                    ? ` <div class="my-2">
                <button class="btn btn-danger pt-1 pb-2" onclick="addItemToWishlist('${data.items[i]._id}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="white" stroke-width="2" class="feather feather-heart">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg>
                </button>
                <button class="btn btn-success" onclick="addItemToCart('${data.items[i]._id}')">
                  Add To Cart
                </button>
              </div>`
                    : ""
                }
              </div>
            </div>
          </div>`
          );
        }
      } else {
        productContainer.html(
          "<h4 class='text-light'>No Items Found In Category.</h4>"
        );
      }
    },
  });
}

$(".category-tab").map((index, ele) => {
  ele.addEventListener("click", (e) => {
    const isActive = e.target.className.includes("active");

    if (isActive) return;
    if ($(".active")) {
      $(".active")[0].className = $(".active")[0]
        .className.split(" ")
        .filter((className) => className != "active")
        .join(" ");
      loadProductsForCategory(e.target.className.split(" ").at(-1));
      e.target.className += " active";
    }
  });
});

function addItemToCart(itemId) {
  $.ajax({
    url: "/cart/add",
    type: "POST",
    data: { productId: itemId },
    success: function (data) {},
    error: function (error) {
      console.error("error add to wishlist: ", data);
    },
  });
}

function addItemToWishlist(itemId) {
  $.ajax({
    url: "/wishlist/add",
    type: "POST",
    data: { itemId },
    success: function (data) {
      alert("Item added to wishlist: ", data.item.title);
    },
    error: function (error) {
      console.error("error add to wishlist: ", error.responseJSON.message);
    },
  });
}

function editProduct(productId) {
  $.ajax({
    url: "/product/update/" + productId,
    type: "PUT",
    success: (data) => {},
  });
}

function removeProduct(productId) {
  $.ajax({
    url: "/product/remove/" + productId,
    type: "DELETE",
    success: (data) => {
      loadProductsForCategory(data.item.category);
    },
  });
}
