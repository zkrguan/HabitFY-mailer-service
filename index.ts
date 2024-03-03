import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '.env')});
import express, { Express, Request, Response , Application } from 'express';
import emailRoute from './routes/email'
import cors from 'cors'
import {wireUpScheudledTask} from './timed-task/email'
import { logger } from './configs/winston.config';

const port = process.env.PORT || 8090;
const app: Application = express();
app.use(cors());
app.use(express.json()); 
wireUpScheudledTask();

app.use('/api',emailRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('A boring health check.');
});

app.listen(port, () => {
  logger.info(`My lil server is listening at ${port}`);
});