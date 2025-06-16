const express = require('express');
const { getPosts, createPosts } = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPosts)

module.exports = postRoutes;