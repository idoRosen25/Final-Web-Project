$(() => {
  $("#overlay-dismiss-btn").click(() => {
    $("#overlay").toggleClass("d-none");
  });

  if (window.location.href.includes("/shop") && $(`.general`)) {
    $(`.general`)[0].className += " active";
  }

  loadProductsForCategory("general");
});

function loadProductsForCategory(category) {
  $.ajax({
    url: "/product/" + category,
    type: "GET",
    success: (data) => {
      if (data.items.length) {
        const productContainer = $("#productContainer");
        productContainer.html("");
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
                <button class="btn btn-danger pt-1 pb-2" onclick="addItemToWishlist(${data.items[i]._id})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="white" stroke-width="2" class="feather feather-heart">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg>
                </button>
                <button class="btn btn-success" onclick="addItemToCart(${data.items[i]._id})">
                  Remove
                </button>
              </div>`
                    : ""
                }
                ${
                  data.loggedIn
                    ? ` <div class="my-2">
                <button class="btn btn-danger pt-1 pb-2" onclick="addItemToWishlist(${data.items[i]._id})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="white" stroke-width="2" class="feather feather-heart">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg>
                </button>
                <button class="btn btn-success" onclick="addItemToCart(${data.items[i]._id})">
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
      console.log("200 from delete: ", data);
      window.location.href = "/";
    },
  });
}

function editProduct(productId) {}
