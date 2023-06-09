import mongoose from "mongoose";


const LeaveSchema = new mongoose.Schema({
    Reason: {type: String, required: [true, "Please write a reason"]},
    Status: {type: String,default: 'Pending'},
    start: {
     type: Date,
     required: [true, "Please Insert The Start of your leave" ],
     min: [new Date(), "can't be before now!!"],
    },
    end: {
     type: Date,
     //setting a min function to accept any date one day ahead of start
     min: [function(){
       const date = new Date(this.start)
       const validDate = new Date(date.setHours(date.getHours()+23)) 
       return validDate
     },"Event End must be at least one day a head of event time"],
    default: function(){
      const date = new Date(this.start)
      return date.setDate(date.getDate()+1)
    },
    },
})


export default mongoose.model("Leave", LeaveSchema);