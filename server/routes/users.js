const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/auth-check');
const { cloudinary } = require('../config/cloudinary');
const { loginValidator, registerValidator } = require("../validate/validator");

const router = express.Router();

//login route
router.post('/login', (req, res) => {
    const { errors, isValid } = loginValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                res.json({ message: 'Email does not exist', success: false });
            } else {
                //comparing hash password with given password
                bcrypt.compare(req.body.password, user.password).then(success => {
                    if (!success) {
                        res.json({ message: 'Invalid password', success: false });
                    } else {
                        const payload = {
                            id: user._id,
                            name: user.firstName
                        }
                        //authentication
                        jwt.sign(
                            payload,
                            process.env.APP_SECRET, { expiresIn: 2215674 },
                            (err, token) => {
                                res.json({
                                    user,
                                    token: 'Bearer token: ' + token,
                                    success: true
                                })
                            }
                        )
                    }
                })
            }
        })
    }
})

//register route
router.post('/register', (req, res) => {
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        const { firstName, lastName, email, password } = req.body;
        const registerUser = new Users({
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date()
        });
        //generating hashed version of password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
                if (err || hashErr) {
                    res.json({ message: 'hashing error', success: false });
                    return;
                }
                registerUser.password = hash;
                registerUser.save().then(() => {
                    res.json({ "message": "User creation successful", "success": true });
                }).catch(er => res.json({ message: er.message, success: false }));
            })
        })
    }
})

router.get('/:id', checkAuth, (req, res) => {
    Users.findOne({ _id: req.params.id }).then(user => {
        res.json({ user, success: true })
    }).catch(er => {
        res.json({ success: false, message: er.message });
    })
})



module.exports = router;