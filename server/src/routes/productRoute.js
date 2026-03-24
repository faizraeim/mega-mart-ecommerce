import express from "express";

import {
  createProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  updateProduct,
  updateProductField,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();
route.get("/products", getAllProducts);
route.get("/products/filter", getFilteredProducts);
route.get("/product/:id", getProductById);
route.post("/product", createProduct);
route.put("/update/product/:id", updateProduct);
route.patch("/update/product/:id", updateProductField);
route.delete("/delete/product/:id", deleteProduct);

export default route;
