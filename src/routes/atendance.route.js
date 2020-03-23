const express = require('express');
const router = express.Router();
const { attendanceController } = require('../controllers');

/**
 * @Get Get user attendance.
 */
router.get('/list', attendanceController.getAttendance);

/**
 * @Get Get user attendance by id.
 */
router.get('/list/:id', attendanceController.getAttendanceById);

/**
 * @Post Add addendance 
 * @returns Added User attendance
 */
router.post('/add', attendanceController.addAddendance);

/**
 * @Update Update attendance by Id.
 */
router.put('/update/:id', attendanceController.updateAttendanceById);

/**
 * @Delete Delete attendance by id.
 */
router.delete('/delete/:id', attendanceController.deleteAttendanceById);

/**
 * @Post Check-in user against UserId.
 */
router.post('/checkIn/:userId', attendanceController.CheckIn);

/**
 * @Update check-out user against UserId.
 */
router.put('/checkOut/:userId', attendanceController.CheckOut);

/**
 * @Update Start user break against UserId.
 */
router.put('/startBreak/:userId', attendanceController.startBreak);

/**
 * @Update End user break against UserId.
 */
router.put('/endBreak/:userId', attendanceController.endBreak);

module.exports = router;