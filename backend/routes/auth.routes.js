const { register, login, getUsers, userActiveDeactive } = require("../controllers/auth.controllers");
const { authenticate, adminOnly } = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:userId", authenticate, adminOnly, userActiveDeactive);
router.get("/get-users", authenticate, adminOnly, getUsers);

module.exports = router;