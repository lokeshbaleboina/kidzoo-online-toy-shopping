const express = require("express")
const router = express.Router()

router.post("/toysdata",(req,res)=>{
    try {
       res.send([global.toyscato,global.cato]) 
    } catch (error) {
        console.error(error.message);
        res.send("server error")
        
    }
})

module.exports = router;