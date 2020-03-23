const { Attendance } = require('../models');

/**
 * Get Attendance list.
 */
exports.getAttendance = (req, res) => {
    console.log("getAttendance-called")
    Attendance.find({})
        .populate('user', ['username', 'firstname', 'lastname', 'phone', 'email', 'address', 'CNIC', 'active'])
        .then(attendance => {
            if (!attendance) {
                return res.status(404).json({ message: 'attendanceNotFound' });
            }

            return res.status(200).json({ message: 'Attendance Found Successfully', data: attendance });
        }).catch(error => {
            return res.status(500).json({ message: 'attendanceNotFetched' });
        });
}

/**
 * Get Attendance by id.
 */
exports.getAttendanceById = (req, res) => {
    const { id } = req.params;

    Attendance.findOne({ _id: id })
        .populate('user', ['username', 'firstname', 'lastname', 'phone', 'email', 'address', 'CNIC', 'active'])
        .then(attendance => {
            if (!attendance) {
                return res.status(404).json({ message: 'attendanceNotFound' });
            }

            return res.status(200).json({ message: 'Attendance Found Successfully', data: attendance });
        }).catch(error => {
            return res.status(500).json({ message: 'attendanceNotFetched' });
        });
}

/**
* Find either already CheckIn or not, if not already CheckedIn then CheckIn user.
* @returns Created Record
*/
exports.CheckIn = (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
    const todayDate = getCurrentDate();
    
    Attendance.findOne({ "date": todayDate, "user": userId }).then(currentAttendance => {

        if (currentAttendance) {
            return res.status(400).json({ message: 'alreadyCheckedIn' });
        }

        const attendance = new Attendance({
            checkIn: new Date(),
            date: todayDate,
            status: status,
            user: userId
        });

        attendance.save().then(createdAttendance => {
            if (!createdAttendance) {
                return res.status(500).json({ message: 'attendanceNotAdded' });
            }

            // createdAttendance.checkIn = new Date(createdAttendance.checkIn).toLocaleString();

            return res.status(200).json({ message: 'CheckedInSuccessfully', data: createdAttendance });
        }).catch(error => {
            return res.status(500).json({ message: 'attendanceNotAdded' });
        });
    });
}

/**
* Find either already Check-out or not, if already Checked-out then check-out user.
* @returns Updated Record
*/
exports.CheckOut = (req, res) => {
    const { userId } = req.params;
    const { comment } = req.body;
    const todayDate = getCurrentDate();

    Attendance.findOne({ 'date': todayDate, 'user': userId }).then(currentAttendance => {

        console.log("currentAttendance:",currentAttendance)

        if (!currentAttendance || (currentAttendance && !currentAttendance.checkIn)) {
            return res.status(400).json({ message: 'notcheckIn' });
        }

        if (currentAttendance.checkOut) {
            return res.status(400).json({ message: 'alreadycheckedOut' });
        }

        Attendance.findOneAndUpdate({ date: todayDate, user: userId }, {
            $set: {
                checkOut: new Date(),
                comment: comment,
            }
        }).then(updatedAttendance => {
            if (!updatedAttendance) {
                return res.status(404).json({ message: 'AttendanceNotFound' });
            }

            return res.status(200).json({ message: 'CheckedOutSuccessfully', data: updatedAttendance });
        }).catch(error => {
            return res.status(500).json({ message: 'notCheckedOut' });
        });
    });
}

/**
* Find either already break started or not, if not then start break of user.
* @returns Updated Record
*/
exports.startBreak = (req, res) => {
    const { userId } = req.params;
    const todayDate = getCurrentDate();

    Attendance.findOne({ date: todayDate, user: userId }).then(currentAttendance => {

        if (!currentAttendance || (currentAttendance && !currentAttendance.checkIn)) {
            return res.status(400).json({ message: 'notCheckedIn' });
        }
        
        if (currentAttendance.checkOut) {
            return res.status(400).json({ message: 'alreadyCheckedOut' });
        }

        if (currentAttendance.breakEndTime) {
            return res.status(400).json({ message: 'alreadyBreakEnded' });
        }

        if (currentAttendance.breakStartTime) {
            return res.status(400).json({ message: 'alreadyBreakStarted' });
        }

        Attendance.findOneAndUpdate({ date: todayDate, user: userId }, {
            $set: {
                breakStartTime: new Date(),
            }
        }).then(updatedAttendance => {
            if (!updatedAttendance) {
                return res.status(404).json({ message: 'AttendanceNotFound' });
            }

            return res.status(200).json({ message: 'startedBreakSuccessfully', data: updatedAttendance });
        }).catch(error => {
            return res.status(500).json({ message: 'AttendanceNotUpdated' });
        });
    });
}

/**
* Find either already CheckedIn or not, if already CheckIn then CheckOut user.
* @returns Updated Record
*/
exports.endBreak = (req, res) => {
    const { userId } = req.params;
    const todayDate = getCurrentDate();

    Attendance.findOne({ date: todayDate, user: userId }).then(currentAttendance => {

        if (!currentAttendance || (currentAttendance && !currentAttendance.checkIn)) {
            return res.status(400).json({ message: 'notCheckedIn' });
        }

        if (currentAttendance.checkOut) {
            return res.status(400).json({ message: 'alreadyCheckedOut' });
        }

        if (!currentAttendance.breakStartTime) {
            return res.status(400).json({ message: 'breakNotStarted' });
        }

        if (currentAttendance.breakEndTime) {
            return res.status(400).json({ message: 'alreadyCheckedOut' });
        }

        Attendance.findOneAndUpdate({ date: todayDate, user: userId }, {
            $set: {
                breakEndTime: new Date()
            }
        }).then(updatedAttendance => {
            if (!updatedAttendance) {
                return res.status(404).json({ message: 'AttendanceNotFound' });
            }

            return res.status(200).json({ message: 'breakEndedSuccessfully', data: updatedAttendance });
        }).catch(error => {
            return res.status(500).json({ message: 'AttendanceNotUpdated' });
        });
    });
}

/**
* Add Attendance.
* @returns Created Record
*/
exports.addAddendance = (req, res) => {
    const { checkIn, checkOut, breakStartTime, breakEndTime, date, status, comment, userId } = req.body;

    const attendance = new Attendance({
        checkIn: checkIn,
        checkOut: checkOut,
        breakStartTime: breakStartTime,
        breakEndTime: breakEndTime,
        date: date,
        status: status,
        comment: comment,
        user: userId
    });

    attendance.save().then(createdAttendance => {
        if (!createdAttendance) {
            return res.status(500).json({ message: 'AttendanceNotAdded' });
        }

        return res.status(200).json({ message: 'AttendanceAddedSuccessfully', data: createdAttendance });
    }).catch(error => {
        return res.status(500).json({ message: 'AttendanceNotAdded' });
    });
}

/**
* Update Attendance against id.
* @returns Updated Record
*/
exports.updateAttendanceById = (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut, breakStartTime, breakEndTime, status, comment, userId } = req.body;

    Attendance.findOneAndUpdate({ _id: id }, {
        $set: {
            checkIn: checkIn,
            checkOut: checkOut,
            breakStartTime: breakStartTime,
            breakEndTime: breakEndTime,
            status: status,
            comment: comment,
            user: userId
        }
    }).then(updatedAttendance => {
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'AttendanceNotFound' });
        }

        return res.status(200).json({ message: 'AttendanceUpdateSuccessfully', data: updatedAttendance });
    }).catch(error => {
        return res.status(500).json({ message: 'AttendanceNotUpdated' });
    });
}

/**
* Delete Attendance against id.
* @returns Deleted Record
*/
exports.deleteAttendanceById = (req, res) => {
    const { id } = req.params;

    // Attendance.findOneAndDelete({ _id: id }).then(deletedAttendance => {
    Attendance.deleteMany().then(deletedAttendance => {
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'AttendanceNotFound' });
        }

        return res.status(200).json({ message: 'AttendanceDeletedSuccessfully', data: deletedAttendance });
    }).catch(error => {
        return res.status(500).json({ message: 'AttendanceNotDeleted' });
    });
}

/**
 * Get current date in format ("m/dd/yyyy") 
 */
getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleString('en-US', {year: 'numeric' ,month: 'numeric', day: 'numeric' });
}
