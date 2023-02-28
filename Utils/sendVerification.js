var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2')
var smtpTransport = require('nodemailer-smtp-transport');


// These id's and secrets should come from .env file.
const CLIENT_ID = '407408718192.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04u7CrocE8abvCgYIARAAGAQSNwF-L9Iriw6LMYulcLDK7lrQjjghJ-nn-Q9Q4HIoGzc9Xr1G_qlDkS4EEIWC45rtZwVColnaElg';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailsArr,code) {
    // console.log("success",emailsArr,code);
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'newsletter@kloudrac.com',
          clientId: '407408718192.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken: '1//04u7CrocE8abvCgYIARAAGAQSNwF-L9Iriw6LMYulcLDK7lrQjjghJ-nn-Q9Q4HIoGzc9Xr1G_qlDkS4EEIWC45rtZwVColnaElg',
          accessToken: "ya29.a0AVvZVsr_nCUmLuJQuxjTfdko-yEJ2YiSjdzj-OvwPALgCiSSPh97QH-6Nlg283wrpfc0bq0KAudeET_R6-z0sMQ_SnHtvdmwPeuf_c5EZNAb0f1qogX5MtaILSONen756MQigCrVSYpewodNLDufAgzpKot6aCgYKAYUSARISFQGbdwaIGb77WULuGtvuUKltgiWJKg0163",
        },
      });
  
      const mailOptions = {
        from: 'newsletter@kloudrac.com',
        to: emailsArr,
        subject: 'Newsletter',
        text: 'Newsletter from Kloudrac',
        html: code
        // html: `<button onclick="alert("hi this is warning")"  link="www.google.com">Google1</button>`
      };
  
    //   console.log("result","result")
      const result = await transport.sendMail(mailOptions);
      console.log("result",result)

    } catch (error) {
     console.log( error);
    }
  }

  
  module.exports = sendMail;
//   sendMail();


