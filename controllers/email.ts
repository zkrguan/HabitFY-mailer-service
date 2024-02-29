// controllers/UserController.ts
import { Request, Response } from 'express';
import {verifyToken} from '../middlewares/auth'

function postSendEmail(req: Request, res: Response) {
  res.send('I am just wondering what takes you here');
}

export const protectedSendEmail = [verifyToken,postSendEmail];