import nodemailer from "nodemailer";
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "241e322fcc9600", // generated ethereal user
    pass: "89e08389a28d7b", // generated ethereal password
  },
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: "yvdipesh0011@gmail.com", // sender address
  to: "yvdipesh1100@gmail.com", // list of receivers
  subject: "to signup", // Subject line
  text: "fill up your detail", // plain text body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
