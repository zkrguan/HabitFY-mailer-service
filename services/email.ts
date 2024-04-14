import { transporter } from "../configs/email.config";
import { logger } from "../configs/winston.config";
import { EmailOption, GoalDetail } from "../interface/EmailOption.interface";
import { badAssTemplate, professionalTemplate } from "../template/email-template";
import { Prisma, PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql
const prisma = new PrismaClient();

export const scheduleEmailService = async ()=>{
	const result = await prepEmailList()
	for (let email of result){
		await sendDailyDigest(
			{
				to:email.to,
				subject:"HabitFY daily morning digest ☀️😊",
				details:email.detail // missing the text processing logics here
			}
		)
	}
}


const prepEmailList=async()=>{
	const resultList : EmailOption[] = [] as EmailOption[]; 
	// DB still have some testing data which is dirty
	let userResult:any[] =[];
	try{
		 userResult= await prisma.userprofiles.findMany({
			where: {
			  EmailAddress: {
				not:""
			  }
			}
		  });
	}
	catch(error){
		const wait =(ms:number)=> {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		// Our sql db needs 2 mins warm up...
		// You cannot directly connect to it... like heroku app
		await wait(60 * 1000 * 2); 
	}
	for (let user of userResult){
		const detailList : GoalDetail[] = [] as GoalDetail[];
		const result = await prisma.goals.findMany({
			where:{ProfileId: user.Id}
		})
		if(result.length){
			// prep the goal detail inside this loop
			for (let goal of result){
				detailList.push({
					description:goal.Description,
					targetAmount:goal.GoalValue,
				})
			}
		}
		resultList.push({
			to: user.EmailAddress,
			detail:detailList,
		})
	}
	return resultList;
}

// Separate two logics although they look similar.
// Although it looks repetitive, maintainability and scalability are better from my POV. 
export const sendDailyDigest = (
    options: { to: string, subject: string, details: GoalDetail[]}
) => {
	return new Promise((resolve, rejects) => {
		transporter.sendMail(
			{
				to:options.to,
				subject:options.subject,
				html:professionalTemplate(options.details)
			}, 
			(error:any, info:any) => {
				if (error) {
					logger.error(
						`Exception happened inside the node mailer module, sendMailWithOptions function`
					);
					logger.error(error);
					rejects(error);
				} else {
					logger.http(`Receipt accepted ` + info.accepted);
					logger.http(`Response code ` + info.response);
					resolve(info);
				}
			}
		);
	});
};



export const sendMailWithCustomizedContent = (
    options: { to: string, subject: string, rawHTML: string}
) => {
	return new Promise((resolve, rejects) => {
		transporter.sendMail(
			{
				to:options.to,
				subject:options.subject,
				html:options.rawHTML,
			}, 
			(error:any, info:any) => {
				if (error) {
					logger.error(
						`Exception happened inside the node mailer module, sendMailWithOptions function`
					);
					logger.error(error);
					rejects(error);
				} else {
					logger.http(`Receipt accepted ` + info.accepted);
					logger.http(`Response code ` + info.response);
					resolve(info);
				}
			}
		);
	});
};

