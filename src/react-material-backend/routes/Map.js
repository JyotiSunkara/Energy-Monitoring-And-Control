const router=require('express').Router();
let map=require('../models/AC-mapping');

router.route('/').get((req,res)=>{
    map.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    console.log(req.body)
    const floor=req.body.floor
    const wing=req.body.wing
    const room=req.body.room
    const ac=req.body.ac
    const newfloor=new map({floor,wing,room,ac})
    newfloor.save()
    .then(()=>console.log("added"))
    .catch(()=>console.log("mistake"))
})
module.exports=router;