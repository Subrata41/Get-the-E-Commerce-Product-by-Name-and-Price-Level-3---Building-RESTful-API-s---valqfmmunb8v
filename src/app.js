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

  // Find the product with matching name and price
  const product = products.find((p) => p.name === name && p.price === Number(price));

  if (product) {
    // Return the product as a JSON response
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  } else {
    // Return a 404 error with a message if no matching product is found
    res.status(404).json({
      status: "failed",
      message: "Product not found!",
    });
  }
});

module.exports = app;
