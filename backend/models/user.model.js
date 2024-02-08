import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		index: true,
		lowercase: true,
		minLength: [3, "Name must contain at least 3 characters!"],
		maxLength: [30, "Name can not exceed  30 characters!"]
	},
	email: {
		type: String,
		required: [true, "Please provide your email!"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email!"],
	},
	phone: {
		type: Number,
		unique: true,
		required: [true, "Please provide your phone number"]
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minLength: [8, "Password must containe atleast 8 characters!"],
		maxLength: [16, "Password can not more than 16 characters!"],
		Select: false
	},
	role: {
		type: String,
		required: [true, "Please provide your role"],
		enum: ["JobSeeker", "Employer"]
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

});



// HASING THE PASSWORD.
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10) // set setting to 10 recommended
});

//COMPARING PASSWORD during login
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// GENERATNG A JWT TOKEN FOR AUTHORIZATION. passig userId , jwtsecretkey and expiration time .
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

/*
// We can create this as separate function also .
function generateJwtToken(userId) {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
}
// example usage;
const user = new User({ _id: this._id }); // Replace 'user_id_here' with the actual user ID
const token = generateJwtToken(user._id);
console.log('Generated JWT token:', token);
*/


export const User = mongoose.model("User", userSchema)