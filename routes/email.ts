import express from 'express';
import {protectedSendEmail} from '../controllers/email';

const router = express.Router();

router.post('/email', protectedSendEmail);


export default router;