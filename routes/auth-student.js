var express = require('express');
var router = express.Router();
var passport = require('../auth/passport-auth');
var User = require('../models/users');
var Auth = require('../auth/app-auth')

// Register
router.get('/register', function(req, res) {
    res.send('register');
});

// Login
router.get('/login', function(req, res) {
    res.send({ status: "Logged In" });
});

// Register User
router.post('/register', function(req, res) {
    Auth.createUser(req, res)
});

//Login User
router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true, successFlash: true }),
    (req, res) => {
        res.send('Loggedin');
    });

//Logout User
router.get('/logout', (req, res) => {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

module.exports = router;