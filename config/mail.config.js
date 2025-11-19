const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

let emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_KEY;

const sendMail = (email, subject, htmlContent) => {
  let message = new SendSmtpEmail();
  message.subject = subject;
  message.htmlContent = htmlContent;
  message.sender = { name: "Geegstack Shop", email: "mikailameen2612@gmail.com" };
  message.to = [{ email }];

  emailAPI.sendTransacEmail(message)
  .then(res => {
    console.log(res.body);
  }) .catch(err => {
    console.error("Error sending email: ", err);
  });
}

module.exports = sendMail;