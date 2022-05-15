import express from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../app';
import { UserModel } from '../db/models/User';

const router = express.Router();

router.get(``,
	((req, res) => {
		res.send('OK');
	}));

router.post<{},
	{
		token: string;
	},
	{
		login: string;
		password: string;
	}>(``,
	(async (req, res) => {
		const {
			body: {
				login,
				password,
			},
		} = req;
		
		const user = await UserModel.findOne({
			login,
			password,
		}).exec();
		
		console.log('login attempt', {
			user,
		});
		
		if (user) {
			const token = jwt.sign({
				id: user._id,
				login,
				password,
			}, jwtSecret);
			res.json({ token });
		} else {
			res.status(500);
			res.send();
		}
	}));

router.post<{},
	{
		error: string;
	}
	| {
		token: string;
	},
	{
		login: string;
		password: string;
	}>(`/create`,
	(async (req, res) => {
		const {
			body: {
				login,
				password,
			},
		} = req;
		
		const user = await UserModel.findOne({
			login,
		}).exec();
		
		if (user) {
			const userPassword = user.password;
			res.status(500);
			if (userPassword === password) {
				res.json({ error: 'You have already created the user. Please try to login' });
			} else {
				res.json({ error: 'User with this login already exists' });
			}
		} else {
			const newUser = await UserModel.create({
				login,
				password,
			})
			if (newUser) {
				const token = jwt.sign({
					id: newUser._id,
					login,
					password,
				}, jwtSecret);
				res.json({ token });
			} else {
				res.status(500);
				res.send();
			}
		}
		
		if (user) {
			const token = jwt.sign({
				id: user._id,
				login,
				password,
			}, jwtSecret);
			res.json({ token });
		} else {
			res.status(500);
			res.send();
		}
	}));

export default router;
