const router = require('express').Router();
const product = require("../controller/product.controller")
const multer = require('multer');
const path = require('path');
const { checkToken } = require('../middleware/adminMiddleware');

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage : storage,
})

router.get("/all-products",checkToken, product.getProducts)
router.get("/:id", product.getProductsById)
router.post("/add-product",upload.single('product_image'), product.addProducts)
router.put("/:id", product.updateProducts)
router.delete("/:id", product.deleteUser)

module.exports = router;
