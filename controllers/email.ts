// controllers/UserController.ts
import { Request, Response } from 'express';
import {verifyToken} from '../middlewares/auth'
import{sendMailWithOptions} from '../services/email'

async function postSendEmail(req: Request, res: Response) {
    const {options} = req.body;
    try{
        await sendMailWithOptions({to:options.to,subject:options.subject,text:options.body});
        res.status(201).send('email sent!!!');
    }
    catch(e){
        console.log(e);
        console.log(process.env.GMAIL_ADDRESS) 
        console.log(process.env.GMAIL_TOKEN), 
        res.status(500).send(`email sent failed!`);
    }
}

export const protectedSendEmail = [verifyToken,postSendEmail];