import mongoose from "mongoose";
import dotenv from "dotenv";
import productsJson from "../data/products.json" with { type: "json" };
import Product from "./models/productModel.mjs";

dotenv.config();

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    // Clear existing products if any
    await Product.deleteMany({});
    console.log("Cleared existing products");

    const docs = productsJson.products || [];
    if (!Array.isArray(docs) || docs.length === 0) {
      console.warn("No products found in products.json to seed");
    } else {
      await Product.insertMany(docs);
      console.log(`Inserted ${docs.length} products`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("Error while seeding products:", err);
    process.exit(1);
  }
}

seed();
