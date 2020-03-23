const jwt = require("jsonwebtoken"); // import token for user login.
const bcrypt = require("bcryptjs"); // import bcrypt to hash password.

const { User } = require('../models');

/**
 * Register new user
 */
exports.registerUser = (req, res) => {
    const { password, username, roles, firstname, lastname, phone, email, address, CNIC, active } = req.body;

    bcrypt.hash(password, 10).then(hashPassowrd => {
        const user = new User({
            username: username,
            password: hashPassowrd,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address,
            CNIC: CNIC,
            active: active,
            roles: roles
        });

        user.save().then(response => {
            if (!response) {
                return res.status(500).json({ message: "userCreationError" });
            }

            return res.status(200).json({ message: "success", username: username });
        }).catch(error => {
            return res.status(500).json({ message: "userCreationError" });
        });
    });
}

/**
 * Login user. 
 * Returns user as well as token info. 
 */
exports.userLogin = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, ['username', 'password', 'active'])
        .populate('roles', ['name', 'active'])
        .then(user => {

            if (!user) {
                return res.status(404).json({ message: 'usernameNotFound' });
            }

            if (!user.active) {
                return res.status(401).json({ message: 'inactiveUser' });
            }

            const isPasswordMatched = bcrypt.compareSync(password, user.password);

            if (!isPasswordMatched) {
                return res.status(401).json({ message: 'invalidPassword' });
            }

            const token = jwt.sign({ username: username }, 'technovez-privateKey', { expiresIn: '1 days' });

            return res.status(200).send({
                username: user.username,
                roles: user.roles,
                token: token,
                expiresIn: 3600
            });
        }).catch(error => {
            return res.status(404).json({ message: 'usernameNotFound' });
        });
}

/**
 * Get user list.
 * Get all username, roles and password.
 */
exports.getUsers = (req, res) => {
    console.log("-getUsers-Called")
    User.find({}, ['username', 'firstname', 'lastname', 'phone', 'email', 'address', 'CNIC', 'active'])
        .populate('roles', ['name', 'active']).then(userList => {
            if (!userList) {
                return res.status(404).json({ message: 'userListNotFound' });
            }

            return res.status(200).json({ message: 'User List Found Successfully', data: userList });
        }).catch(error => {
            return res.status(500).json({ message: 'userListNotFetched' });
        });
}

/**
 * Get user by id.
 */
exports.getUsersById = (req, res) => {
    const { id } = req.params;

    User.find({ _id: id }, ['username', 'firstname', 'lastname', 'phone', 'email', 'address', 'CNIC', 'active']).then(userList => {
        if (!userList) {
            return res.status(404).json({ message: 'userListNotFound' });
        }

        return res.status(200).json({ message: 'User List Found Successfully', data: userList });
    }).catch(error => {
        return res.status(500).json({ message: 'userListNotFetched' });
    });
}

/**
* Update User against user id.
* @returns Updated Record
*/
exports.updateUserById = (req, res) => {
    const { id } = req.params;
    const { username, roles, firstname, lastname, phone, email, address, CNIC, active } = req.body;

    User.findOneAndUpdate({ _id: id }, {
        $set: {
            username: username,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address,
            CNIC: CNIC,
            active: active,
            roles: roles
        }
    }).then(updatedUser => {
        if (!updatedUser) {
            res.status(404).json({ message: 'UserNotFound' });
        }

        res.status(200).json({ message: 'UserUpdateSuccessfully', data: updatedUser });
    }).catch(error => {
        res.status(500).json({ message: 'UserNotUpdated' });
    });
}

/**
* Delete User against user id.
* @returns Deleted Record
*/
exports.deleteUserById = (req, res) => {
    const { id } = req.params;

    User.findOneAndDelete({ _id: id }).then(deletedUser => {
        if (!deletedUser) {
            res.status(404).json({ message: 'UserNotFound' });
        }

        res.status(200).json({ message: 'UserDeletedSuccessfully', data: deletedUser });
    }).catch(error => {
        res.status(500).json({ message: 'UserNotDeleted' });
    });
}
