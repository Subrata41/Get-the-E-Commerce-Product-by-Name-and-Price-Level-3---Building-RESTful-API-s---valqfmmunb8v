const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// Endpoint for searching products by name and price
app.get("/products/:name/:price", (req, res) => {
  const { name, price } = req.params;
  
  // Search for product in the products array
  const product = products.find(p => p.name === name && p.price == price);
  
  if (product) {
    // Return the product object if found
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: { product },
    });
  } else {
    // Return error message if product is not found
    res.status(404).json({
      status: "failed",
      message: "Product not found!",
    });
  }
});

module.exports = app;
