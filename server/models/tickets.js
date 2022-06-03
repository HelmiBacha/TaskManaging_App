import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

var TicketSchema = new Schema({
    PSA_Number: {
        type: String,
        required: [true, 'Please add PSA Number'],
        unique: true,
    },
    Owner: {
        type: String,
        required: [true, 'Please provide Owner'],
    },
    RequestType: {
        type: String,
        required: [true, 'please add Request type']
    },
    Description: String,
    Priority: {
        type: String,
        default:'P4'
    },
    Status: {
        type: String,
        default: 'Open'
    },
    Comments: String,
    Due_Date: Date,
    tags: String,
    selectedFile: String

},{timestamps: true});




export default mongoose.model('tickets', TicketSchema);