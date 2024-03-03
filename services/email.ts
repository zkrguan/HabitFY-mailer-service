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
		await sendMailWithOptions(
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
	const userResult = await prisma.userprofiles.findMany({
		where: {
		  EmailAddress: {
			not:""
		  }
		}
	  });
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

export const sendMailWithOptions = (
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

