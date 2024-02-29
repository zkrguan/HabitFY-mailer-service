import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response , Application } from 'express';
import emailRoute from './routes/email'

const app: Application = express();
const port = process.env.PORT || 8090;

app.use('/api',emailRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('A boring health check.');
});

app.listen(port, () => {
  console.log(`My lil server is listening at ${port}`);
});