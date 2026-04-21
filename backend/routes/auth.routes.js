const { register, login, getUsers, userActiveDeactive } = require("../controllers/auth.controllers");
const authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:userId", authenticate, userActiveDeactive);
router.get("/get-users", authenticate, getUsers);

module.exports = router;