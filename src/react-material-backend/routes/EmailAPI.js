const router=require('express').Router();
const fs = require('fs');
// var nodemailer = require('nodemailer');
router.route('/send').post((req,res)=>{
    console.log(req.body)
    // path=__dirname
    // var filepath=path+'/EmailAlert/mycontacts.txt'
    // console.log(filepath)
    // // fs.writeFile(filepath,req.body.name+" "+req.body.email,function(err) {
    // //     if(err) {
    // //         return console.log(err);
    // //     }
    // //     console.log("The file was saved!");
    // // });
    // var myscript=path+'/EmailAlert/fancymail.py';
    // console.log(myscript)
    // const spawn = require('child_process').spawn;
    // const pythonProcess = spawn('python3', [myscript]);
    // let result=''
    // pythonProcess.stdout.on('data', data=>{
        
    //     result += data.toString();
    //     // Or Buffer.concat if you prefer.
    //     console.log(result)
    // });
    // pythonProcess.stdout.on('end', () => {

    //     try {
    //         // If JSON handle the data
    //         result=(JSON.parse(result))
    //         // const data = JSON.parse(Buffer.concat(chunks).toString());
    //         // console.log(result)
    //         res.json(result)

    //     } catch (e) {
    //         // Handle the error
    //         // console.log(result);
    //     }
    // });
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'krbdashboard@outlook.com',
          pass: 'ArushiSinghal'
        }
      });
    var mailOptions = {
    from: 'krbdashboard@outlook.com',
    to: req.body.email,
    subject: 'Message from KRB Administrator!',
    html: '<h2> Energy Saving Alert<\h2><p> Please check on the AC usage in your lab!<\p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 
    
});
module.exports=router;