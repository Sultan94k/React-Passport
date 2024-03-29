const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/user');

passport.deserializeUser((user, done) => {
    console.log('serializeUser called user: ');
    console.log(user);//the whole raw user obj
    console.log('------------------');
    done(null, { _id: user._id })
});

passport.deserializeUser((id, done) => {
    console.log('Deser-r called')
    user.findOne(
        {
            _id: id
        },
        'username',
        (err, user) => {
            console.log('des-r user, user');
            console.log(user);
            console.log('-----------');
            done(null, user)
        }
    )
});

passport.use(LocalStrategy);

module.exports = passport;