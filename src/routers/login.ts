import express from 'express';
import jwt  from 'jsonwebtoken';
import { jwtSecret } from '../app';

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
	((req, res) => {
		const {
			body: {
				login,
				password,
			},
		} = req;
		
		if (login === 'admin' && password === 'admin') {
			const token = jwt.sign({ login, password }, jwtSecret);
			res.json({ token });
		} else {
			res.status(500);
			res.send();
		}
	}));

export default router;
