import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '.env')});
import express, { Express, Request, Response , Application } from 'express';
import emailRoute from './routes/email'
const port = process.env.PORT || 8090;
const app: Application = express();
app.use(express.json()); 

app.use('/api',emailRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('A boring health check.');
});

app.listen(port, () => {
  console.log(`My lil server is listening at ${port}`);
});