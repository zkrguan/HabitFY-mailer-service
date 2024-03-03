import cron from 'node-cron';
import { scheduleEmailService } from '../services/email';

// '*/5 * * * * *' triggered every 5 seconds, this is for testing

cron.schedule('0 7 * * *', () => {
    // This is my idea, not even await. Just let it run in the background.
    const result = scheduleEmailService();
    result.then((data:any)=>{
        // Will be about logging the record instead of simply console out
        console.log(data)
    })
    .catch((err:any)=>{
        console.log(`Log the error here`)
    })    
	console.log('Running a task every 5 seconds');
});

export const wireUpScheudledTask = ()=>{
    console.log('scheduled task will be running at 7am every day');
}