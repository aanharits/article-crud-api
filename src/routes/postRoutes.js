const express = require('express');
const { getPosts, createPosts, updatePosts, deletePosts } = require('../controller/postController');
const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPosts)
postRoutes.put('/posts/:id', updatePosts);
postRoutes.delete('/posts/:id', deletePosts);

module.exports = postRoutes;