const mongose = require('mongoose')
mongose.Promise = global.Promise

//?  local database url...

const uri = 'mongodb://localhost:27017/simple-mern-passport'

mongose.connect(uri).then(
    () => {
        console.log('Connected to mongo');
        
    },
    err => {
        console.log('error connecting to mongo');
        console.log(err);
             
    }
);

module.exports = mongoose.connection