const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gOPiBhabhi.LaptopLover',
        pass: 'cleanthelaptop'
    }
});

let renderTemplate = function(data,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering the template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}