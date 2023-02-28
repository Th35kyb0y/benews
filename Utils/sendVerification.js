var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2')
var smtpTransport = require('nodemailer-smtp-transport');


// These id's and secrets should come from .env file.
const CLIENT_ID = '168960810677-7i4c08lvfol75vj322lvgti1lbl86hk2.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04GAkXDfQxptmCgYIARAAGAQSNwF-L9IrB5cLW5dbWjOfgLS7EKQj4MLgBQRfymmn3Uirsg47FwoIVNGytXDRB6PzzvxlTD2kXPw';

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
      host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        type:'OAuth2',
        user:'newsletter@kloudrac.com',
        clientId :'508356629457-lth9pq3i0de8aj2madorntd85ood4qah.apps.googleusercontent.com',
        clientSecret : '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',
        refreshToken:   "1//04GAkXDfQxptmCgYIARAAGAQSNwF-L9IrB5cLW5dbWjOfgLS7EKQj4MLgBQRfymmn3Uirsg47FwoIVNGytXDRB6PzzvxlTD2kXPw",
        accessToken:accessToken

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


