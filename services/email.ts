import { transporter } from "../configs/email.config";
import { EmailOption, GoalDetail } from "../interface/EmailOption.interface";
import { badAssTemplate, professionalTemplate } from "../template/email-template";
import { PrismaClient } from '@prisma/client'
// https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql
const prisma = new PrismaClient();

export const prepEmailList=async()=>{
	const resultList : EmailOption[] = [] as EmailOption[]; 
	const userResult = await prisma.userprofiles.findMany({});
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
			to:"Fake email",
			detail:detailList,
		})
	}
	return resultList;
}

export const sendMailWithOptions = (
    options: { to: string, subject: string, text: string }
) => {
	return new Promise((resolve, rejects) => {
		transporter.sendMail(
			{
				to:options.to,
				subject:options.subject,
				html:professionalTemplate
			}, 
			(error:any, info:any) => {
				if (error) {
					console.error(
						`Exception happened inside the node mailer module, sendMailWithOptions function`
					);
					console.error(error);
					rejects(error);
				} else {
					console.log(`Receipt accepted ` + info.accepted);
					console.log(`Response code ` + info.response);
					resolve(info);
				}
			}
		);
	});
};

