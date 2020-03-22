const spawn = require('child_process').spawn;
const pythonProcess = spawn('python3', ["./graph.py"]);

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
        console.log(result[0])
        // console.log(data);
        // {
        //    "thing1": "Hot",
        //    "thing2": "Cold",
        //    "thing3": "Warm"
        // }

    } catch (e) {
        // Handle the error
        console.log(result);
    }
});