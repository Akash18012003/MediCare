const express= require('express');
const router = express.Router();

router.post('/medicineData',(req,res)=>{
    try{
        
        res.send([global.medicine_iteams,global.medicine_catogory])
    }catch(error){
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports=router;