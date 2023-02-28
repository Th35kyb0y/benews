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
          clientId: '508356629457-lth9pq3i0de8aj2madorntd85ood4qah.apps.googleusercontent.com',
          clientSecret:'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',
          refreshToken: '1//04AgUI41G1DE6CgYIARAAGAQSNwF-L9IrUvcfiQ0105uAOHfbwU2F49R7_nsJEL5AuoE-H7pYnGvrrnERPu2exwxNwYIxW9UEuWE',
          accessToken: "ya29.a0AVvZVsoyXP3YCK_ZlZA0CCA0VUAwMrw2CWqZ0fqlanu5ceOcNuu5ekU1fY9_oK2MQc8pk9SW77dPSeW_47Q8my1fs_fqFtkVChqNOqV79JZbPCnQ-7p_Ndku_457Y5_9Zal1Q01ED_2xydlRYrW-VNOmt9QOaCgYKAe0SARESFQGbdwaIvckb_a56gViAQZ1VwQtPjw0163",
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


