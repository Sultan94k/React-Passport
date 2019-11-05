const express = require('express');
const router = express.Router();
const user = require('../database/models/user');
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');
    const { username, password } = req.body
    user.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('user.js post error: ', err);
        } else if (user) {
            res.json({
                error: 'sorry, alredy user with this name already exists'
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, saveUser) => {
                if (err) return res.json(err)
                res.json(saveUser)
            })
        }
    })
});

router.post(
    '/login',
    function (req, res, next) {
        console.log('router/user.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('loged in ', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)
router.get('/', (req, res, next) => {
    console.log('----user!!------');
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({msg: 'logging out'})
    } else {
        res.send({msg: 'no user to log out'})
    }
})
module.exports = router;