const userRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");

const router = require("express").Router();

router.use("/auth", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;