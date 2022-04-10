import express from 'express';

const router = express.Router();

router.get(``,
	((req, res) => {
		res.send('OK');
	}));

router.post<{},
	{
		message: string;
		result: boolean;
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
			res.send({
				message: 'OK',
				result: true,
			});
		} else {
			res.status(500);
			res.send();
		}
	}));

export default router;
