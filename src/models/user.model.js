const mongoose = require('mongoose');

/** Define User model schema */
const userSchema = mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    CNIC: { type: String },
    active: { type: Boolean },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

/** Exports User Schema model */
module.exports = mongoose.model('User', userSchema);