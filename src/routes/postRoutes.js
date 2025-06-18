const express = require('express');
const { getPosts, createPosts, updatePosts } = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPosts)
postRoutes.put('/posts/:id', updatePosts);

module.exports = postRoutes;