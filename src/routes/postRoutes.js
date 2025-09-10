const express = require('express');
const { getPosts, createPosts, updatePosts, deletePosts } = require('../controller/postController');
const authorize = require('../middleware/authorize');
const postRoutes = express.Router();

postRoutes.get('/posts', authorize, getPosts);
postRoutes.post('/posts', authorize, createPosts)
postRoutes.patch('/posts/:id', authorize, updatePosts);
postRoutes.delete('/posts/:id', deletePosts);

module.exports = postRoutes;