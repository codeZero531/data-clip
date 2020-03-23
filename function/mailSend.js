var express = require('express');
const nodemailer = require("nodemailer");
require('dotenv').config();


async function mailSend(){
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "webmail.dataclip.tech.",
        // port: 587,
        // secure: false,
        service: "gmail",
        auth: {
            user: process.env.MAIL_ADDRESS, // generated ethereal user
            pass: process.env.MAIL_KEY // generated ethereal password
        },
        tls: { secureProtocol: "TLSv1_method" }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"📎 Dataclip account verification" <foo@example.com>', // sender address
        to: "janakapradeepedirisinghe@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = mailSend;
