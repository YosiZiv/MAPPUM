const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { SEND_GRID_CONFIG } = require('../../config/keys');
const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: SEND_GRID_CONFIG,
        },
    }),
);

exports.sendPasswordToMail = async (name , email, initPassword) => {
    try {

        const sendMail = await transporter.sendMail({
            to: email,
            from: 'admin@mykappa.com',
            subject: 'הרשמתך ל myKappa הושלמה',
            html: `
    <table style = "width: 600px; border: 1px solid black;">
    <h2>תודה שנרשמתם myKlappa</h2>
    <br>
    <p style="color: pink;">שלום ${name}<p>
    <p>סיסמא לאזור האישי לפניכם</p>
    <br>
    <p style="color: blue;"> ${ initPassword}</p>
    </table>
    `});    
    return sendMail
    }
    catch (err) {
        console.log(err);

    }
}

exports.sendPdfToMail = async (pdf, email, message) => {
    try {
        const sendMail = await transporter.sendMail({
            to: email,
            from: 'admin@mykappa.com',
            subject: 'רכישה הושלמה ',
            attachments: [
                {
                    path:  pdf,
                }
            ],
            html: message
        });     
    return sendMail
    }
    catch (err) {
        console.log(err);

    }
}
