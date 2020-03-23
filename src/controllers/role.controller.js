const { Role } = require('../models');

/**
 * Add new Role record
 * @returns New created record
 */
exports.createRole = (req, res) => {
    const { name, active } = req.body;

    const role = new Role({
        name: name,
        active: active,
    });

    role.save().then(createUser => {
        if (!createUser) {
            return res.status(500).json({ message: "RoleNotCreated" });
        }

        return res.status(200).json({ data: createUser });
    }).catch(error => {
        return res.status(500).json({ message: "RoleNotCreated" });
    });
}

/**
 * Get Role List
 */
exports.getRoles = (req, res) => {
    Role.find().then(roleList => {
        if (!roleList) {
            res.status(404).json({ message: 'RoleListNotFound' });
        }

        res.status(200).json({ message: 'Role List Found Successfully', data: roleList });
    }).catch(error => {
        res.status(500).json({ message: 'RoleListNotFetched' });
    });
}

/**
 * Get Role record against Role id.
 * @returns Role record
 */
exports.getRoleById = (req, res) => {
    const { id } = req.params;

    Role.findOne({ _id: id }).then(roleObj => {
        if (!roleObj) {
            res.status(404).json({ message: 'RoleNotFound' });
        }

        res.status(200).json({ message: 'Role Found Successfully', data: roleObj });
    }).catch(error => {
        res.status(500).json({ message: 'RoleNotFetched' });
    });
}

/**
 * Update Role against Role id.
* @returns Updated Record
 */
exports.updateRoleById = (req, res) => {
    const { id } = req.params;
    const { name, active } = req.body;

    Role.findOneAndUpdate({ _id: id }, {
        $set: {
            name: name,
            active: active
        }
    }).then(updatedRole => {
        if (!updatedRole) {
            res.status(404).json({ message: 'RoleNotFound' });
        }
        res.status(200).json({ message: 'RoleUpdatedSuccessfully', data: updatedRole });
    }).catch(error => {
        res.status(500).json({ message: 'RoleNotUpdated' });
    });
}

/**
 * Delete Role against Role id.
 * @returns Deleted Record
 */
exports.deleteRoleById = (req, res) => {
    const { id } = req.params;

    Role.findOneAndDelete({ _id: id }).then(deletedRole => {
        if (!deletedRole) {
            res.status(404).json({ message: 'RoleNotFound' });
        }

        res.status(200).json({ message: 'RoleDeletedSuccessfully', data: deletedRole });
    }).catch(error => {
        res.status(500).json({ message: 'RoleNotDeleted' });
    });
}
