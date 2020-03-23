const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

/**
 * @Get Get user list.
 */
router.get('/list', userController.getUsers);

/**
 * @Get Get user list by id.
 */
router.get('/list/:id', userController.getUsersById);

/**
 * @Post Login user
 * @returns user info.
 */
router.post('/login', userController.userLogin);

/**
 * @Post Register new user
 */
router.post('/register', userController.registerUser);

/**
 * @Update Update user by id.
 */
router.put('/update/:id', userController.updateUserById);

/**
 * @Delete Delete user by id.
 */
router.delete('/delete/:id', userController.deleteUserById);

module.exports = router;