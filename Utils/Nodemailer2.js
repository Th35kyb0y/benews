var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');


const CLIENT_ID = '586450268475-qjbpemtp5k88aouuk379mfc9644rukgo.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '4/0AWtgzh77lBW4iomWO915VvWPFXg2nf6aDMCAqmmjAX7SZUP2aCJtwjY09-0iuTKl4mgugQ';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailsArr,code) {
    console.log("success",emailsArr,code);
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'newsletter@kloudrac.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'newsletter@kloudrac.com',
        to: emailsArr,
        subject: 'Newsletter',
        text: 'Newsletter from Kloudrac',
        html: code
      };
  
      console.log("result","result")
      const result = await transport.sendMail(mailOptions);
      console.log("result",result)
      return result;
    } catch (error) {
      console.log(error.message  +" this is errroooorrrrr")
    }
  }

  
  module.exports = sendMail;
//   sendMail();


