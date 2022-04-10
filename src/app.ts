import express from 'express';
import cors from 'cors';
import { default as loginRouter } from './routers/login';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = 3001;
const BASE_URL = '/api/v1';

app.use(`${BASE_URL}/login`, loginRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
