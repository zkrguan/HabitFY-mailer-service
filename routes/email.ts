import express from 'express';
import {protectedSendEmail, testController} from '../controllers/email';

const router = express.Router();

router.post('/email', protectedSendEmail);

router.get('/test', testController)

export default router;