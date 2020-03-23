const express = require('express');
const router = express.Router();
const { roleController } = require('../controllers');

/**
 * @Get Get all roles list
 * @returns {Array} roles list.
 */
router.get('/list', roleController.getRoles);

/**
 * @Get Get role record against id.
 * @returns {object} role record.
 */
router.get('/list/:id', roleController.getRoleById);

/**
 * @Post Add new role
 * @returns {object} New created role record.
 */
router.post('/add', roleController.createRole);

/**
 * @Put Update role record against id.
 * @returns {object} Record of updated role.
 */
router.put('/update/:id', roleController.updateRoleById);

/**
 * @Delete Delete role record against id.
 * @returns {object} Deleted role record.
 */
router.delete('/delete/:id', roleController.deleteRoleById);

/** Exports role routes */
module.exports = router;