const Product = require("../../models/product.model");

const getOneProduct = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({type: "error", message: "Product doesn't exist"});
        }
        res.status(200).json({type: "success", message: "Product fetched successfully", product});
    })
    .catch((err) => {
        res.status(500).json({type: "error", message: "Error fetching product details", errorMsg: err.message});
    })
}

module.exports = getOneProduct;