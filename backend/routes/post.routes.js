const { createPost, updatePost, deletePost, getPosts, getPostById } = require("../controllers/post.controllers");
const authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

router.post("/create", authenticate, createPost);
router.put("/update/:postId", authenticate, updatePost);
router.delete("/delete/:postId", authenticate, deletePost);
router.get("/get-posts", getPosts);
router.get("/get-post/:postId", getPostById);

module.exports = router;