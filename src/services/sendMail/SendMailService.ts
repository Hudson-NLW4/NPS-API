import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {

    private client: Transporter

    constructor() {
        nodemailer.createTestAccount()
        .then( account => {
            // Create a SMTP transporter object
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        })
    }

    async execute(
        to: string,        
        variables: {name: string, title: string, description: string, id: string, link: string | undefined},
        path: string
    ) {                               
        const templateFileContent = fs.readFileSync(path).toString("utf8");

        const mailTemplate = handlebars.compile(templateFileContent)
        const html = mailTemplate({
            name: variables.name,
            title: variables.title,
            description: variables.description,
            id: variables.id,
            link: variables.link
        })

        const message = await this.client.sendMail({
            to,
            subject: variables.title,
            html: html,
            from: "HUDSON <noreplay@nps.com.br>"
        });

        console.log('Message sent: %s', message.messageId);        
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();