const productService = require("../services/product");
const categoryService = require("../services/category");

async function shopByCategory(req, res) {
  const categories = await categoryService.getCategories();

  if (categories) {
    res.render("shop", {
      categories,
      loggedIn: !!req.session.username,
      isAdmin: !!req.session.isAdmin,
    });
  } else {
    res.redirect("/error?code=400");
  }
}

async function getProductsByCategory(req, res) {
  const { category } = req.params;

  const items = await productService.getProductsByCategory(category);
  if (items) {
    res.json({
      status: "success",
      code: 200,
      items,
      loggedIn: !!req.session.username,
      isAdmin: !!req.session.isAdmin,
    });
  } else {
    res.json({
      status: "error",
      code: 400,
      message: "No items found ",
    });
  }
}

async function addProduct(req, res) {
  try {
    const item = await productService.addProduct(req.body);
    if (item) {
      res.json({
        status: "success",
        message: "product added successfully",
        code: 200,
        item,
      });
    } else {
      throw { code: 400, message: "Couldn't add product" };
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function getProductById(req, res) {
  const { id } = req.params;

  if (id === "new") {
    res.render("addProduct", {
      item: null,
      categories: await categoryService.getCategories(),
    });
  } else {
    try {
      const item = await productService.getProductById(id);
      if (item) {
        res.render("addProduct", {
          item,
          categories: await categoryService.getCategories(),
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.redirect("/product/add/new");
    }
  }
}

async function updateProduct(req, res) {
  const { productId } = req.params;
  const { title, category, price, image } = req.body;

  console.log({ productId, title, category, price, image });
  try {
    const item = await productService.updateProduct({
      productId,
      title,
      category,
      price,
      image,
    });
    if (item) {
      res.json({
        status: "success",
        code: 200,
        message: "Product updated successfully",
        item,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      status: "error",
      code: 400,
      message: "Error updating product",
    });
  }
}

async function removeProduct(req, res) {
  const productId = req.params.productId;

  try {
    if (!productId) throw new Error();
    const remove = await productService.removeProduct(productId);

    if (remove) {
      return res.json({
        status: "success",
        code: 200,
        message: "Product removed successfully",
        item: remove,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      status: "error",
      code: "400",
      message: "Error Removing Product",
    });
  }
}

async function allProductsShop(req, res) {
  try {
    const products = await productService.getAllProducts();

    if (products.length) {
      res.render("allProducts", {
        products,
        loggedIn: !!req.session.username,
        isAdmin: !!req.session.isAdmin,
      });
    } else {
      throw { code: 400, message: "No products found" };
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

async function sortedProducts(req, res) {
  try {
    const sortedItems = await productService.getSortedProducts(req.query);

    if (sortedItems) {
      res.status(200).json({
        status: "success",
        items: sortedItems,
        isAdmin: !!req.session.isAdmin,
        isLoggedIn: !!req.session.username,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
module.exports = {
  getProductsByCategory,
  addProduct,
  getProductById,
  updateProduct,
  removeProduct,
  shopByCategory,
  allProductsShop,
  sortedProducts,
};
