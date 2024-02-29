import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8090;

app.get('/', (req: Request, res: Response) => {
  res.send('A boring health check.');
});

app.listen(port, () => {
  console.log(`My lil server is listening at ${port}`);
});