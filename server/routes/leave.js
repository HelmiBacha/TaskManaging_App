import express from 'express';
import Leave from "../models/Leave.js";
import handleError from "../utils/planningErrors.js";


const router = express.Router();

router.get("/", async(req, res)=>{

    const leaves = await Leave.find({});
 
    try{
       
       res.status(200).json(leaves)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const leave = await Leave.findById(id);
 
    try{
       res.status(200).json(leave)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/", async(req, res)=>{
   
        const newLeave = await new Leave(req.body)
     
        try{
           await newLeave.save((err, leave)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(leave)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    }
)



router.put("/:id/update", async (req, res)=>{
    const id = req.params.id
     try{
        const planning = await Event.findOne({_id : id})
        if(leave){
            Object.assign(leave, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!leave){
            res.status(404).json({error: "Leave request is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



})

router.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        await Leave.findByIdAndRemove(id)
        res.status(200).json("Leave request has been deleted");
    }catch(err){
        handleError(err, res)
    }

})




export default router;