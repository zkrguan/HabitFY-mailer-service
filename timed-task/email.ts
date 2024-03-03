import cron from 'node-cron';
import { scheduleEmailService } from '../services/email';
import { logger } from '../configs/winston.config'

// '*/5 * * * * *' triggered every 5 seconds, this is for testing

cron.schedule('0 7 * * *', async() => {
    let counter = 0;
    const MAX_RETRY = 3; // Maximum number of retry attempts
    const RETRY_INTERVAL = 30 * 1000; // Retry interval in milliseconds (30 seconds)
    try{
        // This is my idea, not even await. Just let it run in the background.
        await scheduleEmailService();
        logger.info(`Daily reminder emails have been sent to the user!`);
    }
    catch(error){
        do {
            logger.warning(`There were some errors happened during the email sending. Retry starts in 30 seconds!`);
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL)); 
            try {
                await scheduleEmailService();
                logger.info(`Retry attempt ${counter + 1} successful. Daily reminder emails have been sent.`);
                counter = 4; 
            } catch (retryError) {
                logger.warn(`Retry attempt ${counter + 1} failed. Error: ${retryError}.`);
                counter++;
            }
            if(counter === MAX_RETRY){logger.error(`Daily emails process failed. Use the manual route to perform the task. Further debug required!`)}
        }while(counter < MAX_RETRY)
    }
});

export const wireUpScheudledTask = ()=>{
    logger.info(`The scheduled task has been wired up.`);
    logger.info(`Current scheduled task is only triggered at 7am.`);
}