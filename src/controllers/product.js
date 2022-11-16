const productService = require("../services/product");
const categoryService = require("../services/category");

async function allProductsPage(req, res) {
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
    res.json({ status: "error", code: error.code, error: error.message });
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

  console.log("params for update product");
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

module.exports = {
  getProductsByCategory,
  addProduct,
  getProductById,
  updateProduct,
  removeProduct,
  allProductsPage,
};
