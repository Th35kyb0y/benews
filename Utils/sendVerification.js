const nodemailer =require('nodemailer');
const {google} =require('googleapis');
 
// const CLIENT_ID = '434313587437-o18cmi86e2m9in0pkiiqa5gt5o7copp9.apps.googleusercontent.com'
const CLIENT_ID = '168960810677-7i4c08lvfol75vj322lvgti1lbl86hk2.apps.googleusercontent.com'
// const CLIENT_SECRET = "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"
const CLIENT_SECRET = "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"
const REDIRECT_URI ='https://developers.google.com/oauthplayground'
// const REFRESH_TOKEN="1//04fPt7p_j01wPCgYIARAAGAQSNwF-L9Ir0epRofxsdfhtq8aXRA10b4YWHMCAc7pakE8NnHYW-83J_SJYkOKCysi9wK1agiYvu84"
const REFRESH_TOKEN= "1//04GqENhXBD_ttCgYIARAAGAQSNwF-L9IrDhKPjuklmv0UqpS3ZkNhOuQx6_3QNonMfB-vlg5lDkMlISlYoUcg7kQUXMu3Rga9414"


// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })


// const accessToken = "ya29.a0AVvZVsoQfAUjXQ_eWVpmh1op0NCEZWY-00i3AADbkZg3NZg6IQqzaTDWWOS0808Qw-1sSYE25tQ7BUmV2Ir3Lmvsvgm_ZIXuQVGt5wyBH2ux-tPS7aOllJeTMv7J-cSVnLzzTIu-d56j9yDItySn15O_ck-qaCgYKAW0SARESFQGbdwaIhnZDRzCf_6kb8kIozghYiQ0163"
const accessToken =  "ya29.a0AVvZVsoDHM92R5frmzotpi_BNU75FZeXhdUsRbgPhcFhXMKa3PLymoTlCdE0hgwtXHqvKEK3oCUjyYfQVzuI5j3SC9KWEtXt8kjYHaCB75xTDiElRu5hseq_mpyYupLZIDOnDdtfPY0lHk2DzB1DmgEqcOMfaCgYKAZ0SARESFQGbdwaIQU_IgofqIaeW3VzAbhYUvQ0163"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        type:'OAuth2',
        user:'newsletter@kloudrac.com',
        clientId :CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN, 
        accessToken:accessToken,

    }, 
})



const sendMailTo = async (emailsArr, code) => {
    var email = {
        to: emailsArr,
        from: 'newsletter@kloudrac.com', //registered Email on sendgrid
        subject: 'Newsletter',
        text: 'Newsletter from Kloudrac',
        html: code
    };

    const result = new Promise((resolve, reject) => {

        transporter.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}


 module.exports=sendMailTo;
