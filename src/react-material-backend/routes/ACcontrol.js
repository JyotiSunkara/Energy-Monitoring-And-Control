const router=require('express').Router();

router.route('/on').post((req,res)=>{
    // console.log(__dirname)
    path=__dirname
    var myscript=path+'/on.py'
    // console.log(myscript)
    var x=[req.body.no]
    var {PythonShell}=require('python-shell')
    var pyshell=new PythonShell(myscript)
    pyshell.send(JSON.stringify(x));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });
    pyshell.end(function (err) {
        if (err){
            throw err;
        };
    
        console.log('finished');
});
});
router.route('/off').post((req,res)=>{
    path=__dirname
    var myscript=path+'/off.py'
    var x=[req.body.no]
    console.log(x)

    var {PythonShell}=require('python-shell')
    var pyshell=new PythonShell(myscript)
    pyshell.send(JSON.stringify(x));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });
    pyshell.end(function (err) {
        if (err){
            throw err;
        };
    
        console.log('finished');
        });
});
router.route('/change').post((req,res)=>{
    // var temp=req.body.temp
    
    x=[req.body.no,req.body.temp]
    //console.log(x)
    path=__dirname
    var myscript=path+'/changetemp.py'

    var {PythonShell} = require('python-shell');
    var pyshell = new PythonShell(myscript);

    pyshell.send(JSON.stringify(x));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });

// end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        console.log('finished');
    });

});
router.route('/status').get((req,res)=>{
    // console.log('dada')
    path=__dirname
    var myscript=path+'/checkstatus.py'
    

    var {PythonShell}=require('python-shell')
    var pyshell=new PythonShell(myscript)
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        res.json(message)
        // console.log('hello')
    });
    // console.log('shit')
    
    // console.log(res)
    pyshell.end(function (err) {
        if (err){
            throw err;
        };
    
        console.log('finished');
});
});
router.route('/temp').get((req,res)=>{
    // console.log('dad')
    path=__dirname
    var myscript=path+'/checktemp.py'
    

    var {PythonShell}=require('python-shell')
    var pyshell=new PythonShell(myscript)
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        res.json(message)
        // console.log(res.data)
    });
    
    pyshell.end(function (err) {
        if (err){
            throw err;
        };
    
        console.log('finished');
});
});

module.exports=router;