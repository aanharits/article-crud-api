const express = require('express');
const { register, login, deleteUsers } = require('../controller/authController');
const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.delete('/users/:id', deleteUsers)

module.exports = authRoutes;
