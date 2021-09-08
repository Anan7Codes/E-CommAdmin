import nodemailer from 'nodemailer'

export async function sendEmail( fromEmail, fromPassword, toEmail, verificationCode ) {
    // console.log("1" + fromEmail, fromPassword, toEmail, verificationCode)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromEmail,
            pass: fromPassword,
        }
    })

    var mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: 'Verification Email',
        html: `<h2>Testing it out rn ig link is ${process.env.NEXTAUTH_URL}/auth/verification?email=${toEmail}&verificationCode=${verificationCode}</h2>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}