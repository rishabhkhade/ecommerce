const router = require('express').Router();
const order = require("../controller/order.controller")
// const { checkToken } = require('../middleware/adminMiddleware');

router.get("/all-orders", order.getOrders)
router.get("/:id", order.getOrdersById)
router.post("/add-order", order.addOrders)
router.put("/:id", order.updateOrders)
router.delete("/:id", order.deleteOrders)

module.exports = router;
