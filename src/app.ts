import express from 'express';
import cors from 'cors';
import jwt, {
	JwtPayload,
	VerifyErrors,
} from 'jsonwebtoken';
import { default as loginRouter } from './routers/login';
import { default as dashboardRouter } from './routers/dashboard';

export const jwtSecret = 'qwerty';

const app = express();
app.use(cors({
	origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;
const BASE_URL = '/api/v1';

app.use(`${BASE_URL}/login`, loginRouter);

const authorization = (req: any, res: any, next: any) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.sendStatus(403);
	}
	
	jwt.verify(token, jwtSecret, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}
		console.log({
			decoded,
		});
		next();
	});
};

app.use(`${BASE_URL}/dashboard`, authorization, dashboardRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
