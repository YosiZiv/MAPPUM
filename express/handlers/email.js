const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
const puppeteer = require('puppeteer');
const getPath = path.join(process.cwd(), 'public');
const { SEND_GRID_CONFIG } = require('../../config/keys');
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SEND_GRID_CONFIG,
    },
  }),
);
const compile = async function(template, data) {
  const filePath = getPath + template;
  const html = await fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};
async function createHtmlPage(data) {
  try {
    const content = await compile('/emailVerification.hbs', data);
    return content;
  } catch (e) {}
}
exports.sendEmailVerificationToEmail = async user => {
  const url = `http://localhost:5001/api/auth/confirm/${user.token}`;
  user.url = url;
  const test = await createHtmlPage(user);
  transporter
    .sendMail({
      to: user.email,
      from: 'admin@mppum.com',
      subject: 'EMAIL Confirmation From MPPUM ',
      html: test,
    })
};
exports.sendPasswordToMail = async (name, email, initPassword) => {
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
    <p style="color: blue;"> ${initPassword}</p>
    </table>
    `,
    });

    return sendMail;
  } catch (err) {}
};

exports.sendPdfToMail = async (pdf, email, message) => {
  try {
    const sendMail = await transporter.sendMail({
      to: email,
      from: 'admin@mykappa.com',
      subject: 'רכישה הושלמה ',
      attachments: [
        {
          path: pdf,
        },
      ],
      html: message,
    });
    return sendMail;
  } catch (err) {}
};
