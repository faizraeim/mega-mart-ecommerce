import { request, response } from "express";
import Product from "../models/productModel.mjs";
import mongoose from "mongoose";

// GET all products
export const getAllProducts = async (request, response) => {
  try {
    const productData = await Product.find();
    if (!productData || productData.length === 0) {
      return response.status(404).json({ message: "Product data not found" });
    }
    response.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching products: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};

// GET single product by numeric id (not _id)
export const getProductById = async (request, response) => {
  try {
    const parsedID = parseInt(request.params.id);
    if (isNaN(parsedID)) {
      console.error("Invalid ID type");
      return response.status(400).json({ message: "Invalid ID type" });
    }

    const productExist = await Product.findOne({ id: parsedID });
    if (!productExist) {
      console.error("Product not found");
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json(productExist);
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};

// GET product filter by query
export const getFilteredProducts = async (request, response) => {
  try {
    const { field, value } = request.query;

    if (!field || !value) {
      console.error("Both field and value query parameters are required");
      return response.status(400).json({
        message: "Both 'field' and 'value' query parameters are required",
      });
    }

    const filter = {};
    filter[field] = value;

    const productData = await Product.find(filter);

    if (!productData || productData.length === 0) {
      console.error("No product found");
      return response
        .status(404)
        .json({ message: `No product found where ${field} = ${value}` });
    }

    response.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching filtered products: ", error);
    return response.status(500).json({ errorMessage: error.message });
  }
};

// POST data to database
export const createProduct = async (request, response) => {
  try {
    const newProduct = new Product(request.body);
    const { id } = newProduct;

    const productExist = await Product.findOne({ id });
    if (productExist) {
      console.error("Product already exists");
      return response.status(400).json({ message: "Product already exists" });
    }
    const savedData = await newProduct.save();
    response.status(200).json(savedData);
  } catch (error) {
    console.error("Error creating product: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};

// PUT update product details that override all details
export const updateProduct = async (request, response) => {
  try {
    const parsedID = parseInt(request.params.id);
    if (isNaN(parsedID)) {
      console.error("Invalid ID type");
      return response.status(400).json({ message: "Invalid ID type" });
    }

    const productExist = await Product.findOne({ id: parsedID });
    if (!productExist) {
      console.error("Product not found");
      return response.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parsedID },
      request.body,
      {
        new: true,
      },
    );
    response.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};

// PATCH update product detials without override all details
export const updateProductField = async (request, response) => {
  try {
    const parsedID = parseInt(request.params.id);
    if (isNaN(parsedID)) {
      console.error("Invalid ID type");
      return response.status(400).json({ message: "Invalid ID type" });
    }

    const productExist = await Product.findOne({ id: parsedID });
    if(!productExist){
      console.error("Product not found");
      return response.status(404).json({message:"Product not found"});
    }

    const updatedProductField = await Product.findOneAndUpdate({id:parsedID}, request.body, {new: false});
    response.status(200).json(updatedProductField)
  } catch (error) {
    console.error("Error updating product field: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};

// DELETE product data
export const deleteProduct = async (request, response) => {
  try {
    const id = request.params.id;
    if (!id) {
      console.errer("Product ID not found");
      return response.status(404).json({ message: "Product ID not found" });
    }

    const productExist = await Product.findById(id);
    if (!productExist) {
      console.error("Product not found");
      return response.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product field: ", error);
    response.status(500).json({ errorMessage: error.message });
  }
};
