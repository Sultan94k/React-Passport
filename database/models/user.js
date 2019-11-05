const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
//   FirstName: { type: String, required: true },
//   LastName: { type: String, required: true },
    Email: { type: String, unique: true, required: true },
  Password: { type: String, unique: false, required: true }
});


userSchema.methods = {
    checkPassword: inputPassword => {
        return bcrypt.compareSync(inputPassword,this.Password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

userSchema.pre('save', function(next){
    if (!this.password) {
        console.log("Models/user... ===no password provided")
        next();
    } else {
        console.log("models/user hashpasword in presave")
        this.password = this.hashPassword(this.password)
        next();
}
})

const User = mongoose.model("User", userSchema);

module.exports = User;