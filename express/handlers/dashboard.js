const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const hbs = require('handlebars');
const { Products, User, Sales } = require('../models');
const puppeteer = require('puppeteer');
const getPath = path.join(process.cwd(), 'public');

const { sendPasswordToMail, sendPdfToMail } = require('./email');
const { validateRegisterInput } = require('../core/validation/auth');
const { validateProductInput } = require('../core/validation/dashboard');

const makeMailMessage = ({
  orderId,
  firstName,
  lastName,
  productName,
  description,
  sellPrice,
}) => {
  return (message = `
<table style = "width: 600px; margin: 0 auto;">
<p>${orderId}</p>
<h4 style = "color: blue; text-align: center; ">שלום ${firstName +
    ' ' +
    lastName} </h4>
<h4 style = "color: black; text-align: center;">תודה על הזמנתם למייל זה מצורף קובץ pdf עם פרטי ההזמנה</h4>
<h4>${productName}</h4>
<span style = "color: black; text-align: center;">${description}</span>
<span style = "color: black; text-align: center;">${sellPrice}</span>
</table>
`);
};

const compile = async function(template, data) {
  const filePath = getPath + template;
  const html = await fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

async function pdf(url, data) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('/sale.hbs', data);
    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({
      path: url,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });
    await browser.close();
    return url;
  } catch (e) {}
}

async function pdf(url, data) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('/sale.hbs', data);
    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({
      path: url,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });
    await browser.close();
    return url;
  } catch (e) {}
}