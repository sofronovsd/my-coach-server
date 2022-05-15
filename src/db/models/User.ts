import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	login: String,
	password: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
});

export const UserModel = mongoose.model('User', UserSchema);
