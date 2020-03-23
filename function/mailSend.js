
const nodemailer = require("nodemailer");
require('dotenv').config();



async  function  mailSend(email, code, id) {
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
    console.log(email);
    console.log(code);
    console.log(id);

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"📎 Dataclip account verification" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Account Confirmation", // Subject line
        text: "Hello world?", // plain text body
        html: templateOne+ `http://localhost:4200/confirm-account/${id}/${code}` +templateTwo // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let templateOne = '<!DOCTYPE html>\n' +
    '<html>\n' +
    '\n' +
    '\n' +
    '<head>\n' +
    '    <title></title>\n' +
    '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n' +
    '    <style type="text/css">\n' +
    '        @media screen {\n' +
    '            @font-face {\n' +
    '                font-family: \'Lato\';\n' +
    '                font-style: normal;\n' +
    '                font-weight: 400;\n' +
    '                src: local(\'Lato Regular\'), local(\'Lato-Regular\'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format(\'woff\');\n' +
    '            }\n' +
    '\n' +
    '            @font-face {\n' +
    '                font-family: \'Lato\';\n' +
    '                font-style: normal;\n' +
    '                font-weight: 700;\n' +
    '                src: local(\'Lato Bold\'), local(\'Lato-Bold\'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format(\'woff\');\n' +
    '            }\n' +
    '\n' +
    '            @font-face {\n' +
    '                font-family: \'Lato\';\n' +
    '                font-style: italic;\n' +
    '                font-weight: 400;\n' +
    '                src: local(\'Lato Italic\'), local(\'Lato-Italic\'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format(\'woff\');\n' +
    '            }\n' +
    '\n' +
    '            @font-face {\n' +
    '                font-family: \'Lato\';\n' +
    '                font-style: italic;\n' +
    '                font-weight: 700;\n' +
    '                src: local(\'Lato Bold Italic\'), local(\'Lato-BoldItalic\'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format(\'woff\');\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '        /* CLIENT-SPECIFIC STYLES */\n' +
    '        body,\n' +
    '        table,\n' +
    '        td,\n' +
    '        a {\n' +
    '            -webkit-text-size-adjust: 100%;\n' +
    '            -ms-text-size-adjust: 100%;\n' +
    '        }\n' +
    '\n' +
    '        table,\n' +
    '        td {\n' +
    '            mso-table-lspace: 0pt;\n' +
    '            mso-table-rspace: 0pt;\n' +
    '        }\n' +
    '\n' +
    '        img {\n' +
    '            -ms-interpolation-mode: bicubic;\n' +
    '        }\n' +
    '\n' +
    '        /* RESET STYLES */\n' +
    '        img {\n' +
    '            border: 0;\n' +
    '            height: auto;\n' +
    '            line-height: 100%;\n' +
    '            outline: none;\n' +
    '            text-decoration: none;\n' +
    '        }\n' +
    '\n' +
    '        table {\n' +
    '            border-collapse: collapse !important;\n' +
    '        }\n' +
    '\n' +
    '        body {\n' +
    '            height: 100% !important;\n' +
    '            margin: 0 !important;\n' +
    '            padding: 0 !important;\n' +
    '            width: 100% !important;\n' +
    '        }\n' +
    '\n' +
    '        /* iOS BLUE LINKS */\n' +
    '        a[x-apple-data-detectors] {\n' +
    '            color: inherit !important;\n' +
    '            text-decoration: none !important;\n' +
    '            font-size: inherit !important;\n' +
    '            font-family: inherit !important;\n' +
    '            font-weight: inherit !important;\n' +
    '            line-height: inherit !important;\n' +
    '        }\n' +
    '\n' +
    '        /* MOBILE STYLES */\n' +
    '        @media screen and (max-width:600px) {\n' +
    '            h1 {\n' +
    '                font-size: 32px !important;\n' +
    '                line-height: 32px !important;\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '        /* ANDROID CENTER FIX */\n' +
    '        div[style*="margin: 16px 0;"] {\n' +
    '            margin: 0 !important;\n' +
    '        }\n' +
    '    </style>\n' +
    '</head>\n' +
    '\n' +
    '<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">\n' +
    '    <!-- HIDDEN PREHEADER TEXT -->\n' +
    '    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: \'Lato\', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We\'re thrilled to have you here! Get ready to dive into your new account. </div>\n' +
    '    <table border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
    '        <!-- LOGO -->\n' +
    '        <tr>\n' +
    '            <td bgcolor="#43cea2" align="center">\n' +
    '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
    '                    <tr>\n' +
    '                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td bgcolor="#43cea2" align="center" style="padding: 0px 10px 0px 10px;">\n' +
    '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">\n' +
    '                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Email Confirmation</h1> <img src="https://i.ibb.co/wWN0YLj/undraw-mail-box-kd5i.png" width="125" height="120" style="display: block; border: 0px;" />\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n' +
    '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <p style="margin: 0;">We\'re excited to have you get started. First, you need to confirm your account. Just press the button below.</p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left">\n' +
    '                            <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
    '                                <tr>\n' +
    '                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">\n' +
    '                                        <table border="0" cellspacing="0" cellpadding="0">\n' +
    '                                            <tr>\n' +
    '                                                <td align="center" style="border-radius: 3px;" bgcolor="#43cea2"><a href="' ;

const templateTwo = '" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #43cea2; display: inline-block;">Confirm Account</a></td>\n' +
    '                                            </tr>\n' +
    '                                        </table>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </td>\n' +
    '                    </tr> <!-- COPY -->\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <p style="margin: 0;">If that doesn\'t work, copy and paste the following link in your browser:</p>\n' +
    '                        </td>\n' +
    '                    </tr> <!-- COPY -->\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #43cea2;">https://dataclip.tech/confirm-account/45sdasdc5cd</a></p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <p style="margin: 0;">If you have any questions, just reply to this email—we\'re always happy to help out.</p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <p style="margin: 0;">Cheers,<br>dataclip Team</p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">\n' +
    '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">\n' +
    '                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>\n' +
    '                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #43cea2;">We&rsquo;re here to help you out</a></p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '        <tr>\n' +
    '            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n' +
    '                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">\n' +
    '                    <tr>\n' +
    '                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: \'Lato\', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>\n' +
    '                            <p style="margin: 0;">\n' +
    '                                2020 &copf; extro-lab</p>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </td>\n' +
    '        </tr>\n' +
    '    </table>\n' +
    '</body>\n' +
    '\n' +
    '</html>';



module.exports = mailSend;
