const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');

module.exports.newComment = function(comment){
    // console.log('Inside comment Mailer',comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'gopiBhabhi.LaptopLover',
        // this is for the guy who created the comment , the mail will be sent as your commment is created
        // this is pretty useless, we should do comment.post.user.email for the guy on whose post was comment made
        to:comment.user.email,
        subject:"New Comment Published",
        html: htmlString

    },(err,info) =>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    })
}