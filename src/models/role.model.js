const mongoose = require('mongoose');

/** Define Role model schema */
const roleSchema = mongoose.Schema({
    name: { type: String, require: true },
    active: { type: Boolean, require: true }
});

/** Exports Role Schema model */
module.exports = mongoose.model('Role', roleSchema);