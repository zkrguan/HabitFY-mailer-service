// controllers/UserController.ts
import { Request, Response } from 'express';
import {verifyToken} from '../middlewares/auth'
import{scheduleEmailService, sendMailWithCustomizedContent} from '../services/email'
import { logger } from '../configs/winston.config';

// Route was created for doing demo during the presentation. 
// Because the daily mailing will be triggered at certain time by cron.
async function postSendEmail(req: Request, res: Response) {
    const {options} = req.body;
    try{

        await sendMailWithCustomizedContent({to:options.to,subject:options.subject,rawHTML:options.body});
        // // use the lower one for testing the scheduled service logics. 
        // await scheduleEmailService();
        res.status(201).send('email sent!!!');
    }
    catch(e){
        logger.error(`The node mailer exceptions`)
        logger.error(e);
        res.status(500).send(`email sent failed!`);
    }
}

export const protectedSendEmail = [verifyToken,postSendEmail];