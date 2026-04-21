const { createPost, updatePost, deletePost, getPosts, getPostById } = require("../controllers/post.controllers");
const { authenticate, adminOnly } = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/create", authenticate, adminOnly, createPost);
router.put("/update/:postId", authenticate, adminOnly, updatePost);
router.delete("/delete/:postId", authenticate, adminOnly, deletePost);
router.get("/get-posts", getPosts);
router.get("/get-post/:postId", getPostById);

module.exports = router;