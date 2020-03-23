const mongoose = require('mongoose');

/** Define Attendance model schema */
const attendanceSchema = mongoose.Schema({
    checkIn: { type: Date },
    checkOut: { type: Date },
    breakStartTime: { type: Date },
    breakEndTime: { type: Date },
    date: { type: String },
    status: { type: Boolean },
    comment: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

/** Exports Attendance Schema model */
module.exports = mongoose.model('Attendance', attendanceSchema);