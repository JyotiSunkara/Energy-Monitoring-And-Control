const router=require('express').Router();
let requests=require('../models/request.js');
router.route('/').get((req,res)=>{
    requests.find()
        .then(users=>{res.json(users);
        console.log(users)})
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    const Email=req.body.email
    const ac=req.body.ac
    console.log(req.body)
    var newRequest=new requests({Email,ac})
    newRequest.save()
    .then(()=>console.log("Request Added"))
    .catch(err=>console.log(err))
})
router.route('/delete').post((req,res)=>{
    const Email=req.body.email
    const ac=req.body.ac
    console.log(req.body)
    requests.remove({Email:Email,ac:ac})
    .then(user=>console.log(user))
    .catch(()=>console.log("Record cannot be deleted"))
})
module.exports=router;