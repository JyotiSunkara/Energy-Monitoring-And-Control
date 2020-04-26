const router=require('express').Router();
let requests=require('../models/request.js');
router.route('/').get((req,res)=>{
    console.log("REQUEST GET")
    requests.find()
        .then(users=>{
            res.json(users);
            console.log(users)
        })
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    const Email=req.body.email
    const ac=req.body.ac
    console.log(req.body)
    console.log("SOMETHING WRONG IS HAPPEING IN ADD")
    var newRequest=new requests({Email,ac})
    requests.find({Email:Email,ac:ac})
    .then(user=>{
        console.log("USER")
        console.log(user)
        console.log(user.length)
        if(user.length==0)
        {
            newRequest.save()
            .then(()=>console.log("Request Added"))
            .catch(err=>console.log(err))
        }
    })
    
})
router.route('/delete').post((req,res)=>{
    const Email=req.body.email
    const ac=req.body.ac
    console.log(req.body)
    requests.deleteOne({Email:Email,ac:ac})
    .then(user=>console.log(user))
    .catch(()=>console.log("Record cannot be deleted"))
})
module.exports=router;