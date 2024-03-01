import { transporter } from "../configs/email.config";

export const sendMailWithOptions = (
    options: { to: string, subject: string, text: string }
) => {
	return new Promise((resolve, rejects) => {
		transporter.sendMail(options, (error:any, info:any) => {
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
		});
	});
};