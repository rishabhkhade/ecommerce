const router = require('express').Router();
const product = require("../controller/product.controller")

router.get("/all-products", product.getProducts)
router.get("/:id", product.getProductsById)
router.post("/add-product", product.addProducts)
router.put("/:id", product.updateProducts)
router.delete("/:id", product.deleteUser)

module.exports = router;
