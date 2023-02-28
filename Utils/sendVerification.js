var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2')
var smtpTransport = require('nodemailer-smtp-transport');


// These id's and secrets should come from .env file.
const CLIENT_ID = '508356629457-lth9pq3i0de8aj2madorntd85ood4qah.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04AgUI41G1DE6CgYIARAAGAQSNwF-L9IrUvcfiQ0105uAOHfbwU2F49R7_nsJEL5AuoE-H7pYnGvrrnERPu2exwxNwYIxW9UEuWE';

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
          clientId: CLIENT_ID,
          clientSecret:CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken:accessToken,
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


