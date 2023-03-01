const nodemailer =require('nodemailer');
const {google} =require('googleapis');
 
// const CLIENT_ID = '434313587437-o18cmi86e2m9in0pkiiqa5gt5o7copp9.apps.googleusercontent.com'
const CLIENT_ID = '168960810677-7i4c08lvfol75vj322lvgti1lbl86hk2.apps.googleusercontent.com'
// const CLIENT_SECRET = "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"
const CLIENT_SECRET = "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"
const REDIRECT_URI ='https://developers.google.com/oauthplayground'
// const REFRESH_TOKEN="1//04fPt7p_j01wPCgYIARAAGAQSNwF-L9Ir0epRofxsdfhtq8aXRA10b4YWHMCAc7pakE8NnHYW-83J_SJYkOKCysi9wK1agiYvu84"
const REFRESH_TOKEN="1//04aq0wgsx_6KiCgYIARAAGAQSNwF-L9Ir2g-vS7tm8kjOqiiIM0fSQZrXmixKUKKWze5TcFS2G8lktDcOJc7Q2ZRtjbWi1bXt5H4"


// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })


// const accessToken = "ya29.a0AVvZVsoQfAUjXQ_eWVpmh1op0NCEZWY-00i3AADbkZg3NZg6IQqzaTDWWOS0808Qw-1sSYE25tQ7BUmV2Ir3Lmvsvgm_ZIXuQVGt5wyBH2ux-tPS7aOllJeTMv7J-cSVnLzzTIu-d56j9yDItySn15O_ck-qaCgYKAW0SARESFQGbdwaIhnZDRzCf_6kb8kIozghYiQ0163"
const accessToken =  "ya29.a0AVvZVsr16xeNNmD62ztjOKGv1vQEoFIIEpSeIGagD7zcRed7mrn4ZR6PGcKWCRPMfoIJ6Jgkah_RcLOByGtI2z2iHDiRNGh70Rf1_o9dv-qGZ8d4Jzd45KqqxNtftJqG0na1mE_nR-wI9L1zYansRlLKDYdyaCgYKAWESARESFQGbdwaIH5BUAy4j-BRw1yE08qrDJQ0163"


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
