const Product = require("../../models/product.model");

const createProduct = (req, res) => {
    const {name, price, description, category, images} = req.body;
    if (!name || !price || !description || !category || !images) { 
        return res.status(400).json({type: "error", message: "A required item is missing."});
    } else if (name.length > 100) {
        return res.status(400).json({type: "error", message: "Product name cannot exceed 100 characters"});
    } else if (category !== "Accessory" && category !== "Gadget" && category !== "Grocery") {
        return res.status(400).json({type: "error", message: "Invalid category"});
    } else if (isNaN(price)) {
        return res.status(400).json({type: "error", message: "Product price should be a number"});
    }

    const productData = {
        name,
        price,
        description,
        category
    }

    Product.create(productData)
    .then(result => {
        res.status(201).json({type: "success", message: "product created successfully", productId: result._id});
    })
    .catch(err => {
        res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
    })

}

module.exports = createProduct;