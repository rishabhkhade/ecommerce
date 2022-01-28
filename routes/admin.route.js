const router = require('express').Router();
const admin = require("../controller/admin.controller")
const auth = require("../controller/auth/login.controller")
// const { admin_check } = require("../middleware/adminMiddleware")

router.get("/", admin.getAllUsers)
router.get("/:id", admin.getOneUser)
router.post("/add-admin", admin.addUser)
router.put("/update", admin.updateUser)
router.delete("/delete", admin.deleteUser)

router.post("/login",auth.getLogin)

module.exports = router;
