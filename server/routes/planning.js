import express from 'express';
import Planning from "../models/Planning.js"
import handleError from "../utils/planningErrors.js";


const router = express.Router();

router.get("/", async(req, res)=>{

    const plannings = await Planning.find({});
 
    try{
       
       res.status(200).json(plannings)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const planning = await Planning.findById(id);
 
    try{
       res.status(200).json(planning)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/", async(req, res)=>{
   
        const newPlanning = await new Planning(req.body)
     
        try{
           await newPlanning.save((err, planning)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(planning)
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
        if(planning){
            Object.assign(planning, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!planning){
            res.status(404).json({error: "Planning is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



//   const result = await Event.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })
})

router.delete("/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Planning has been deleted");
    }catch(err){
        handleError(err, res)
    }

})




export default router;