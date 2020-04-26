const router=require('express').Router();
router.route('/graphdata').post((req,res)=>{
    path=__dirname
    var myscript=path+'/graph.py'
    const spawn = require('child_process').spawn;
    const pythonProcess = spawn('python3', [myscript]);

    let result=''

    pythonProcess.stdout.on('data', data=>{
        
        result += data.toString();
        // Or Buffer.concat if you prefer.
    });

    pythonProcess.stdout.on('end', () => {

        try {
            // If JSON handle the data
            result=(JSON.parse(result))
            // const data = JSON.parse(Buffer.concat(chunks).toString());
            // console.log(result)
            res.json(result)

        } catch (e) {
            // Handle the error
            // console.log(result);
        }
    });
})
module.exports=router;
