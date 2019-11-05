const express = require('express')
// const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user')

app.use(morgan('dev'))
app.use(
    express.urlencoded({
        extended: false
    })
)
app.use(
    session({
        secret: 'special harkening', //pick any random string....
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false  //required
    })
)

app.use(passport.initialize())
app.use(passport.session()) //?calls the deserializer

app.use('/user', user)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)  
})

