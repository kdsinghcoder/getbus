import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    BusName: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    TotalFair: {
        type: Number,
        required: true
    },
    Origin: {
        type: String,
    },
    Destination: {
        type: String,
    },
    Duration: {
        type: String,
    },
    BookedSeats:{
        type: Array,
        default: []
    },
    AlternateOnBording:{
        type: String,
        default:"NIL"
    },
    busID:{
        type: String
    },
    Status:{
        type: String,
        default: "Success"
    },
    DateOfTravel:{
        type: String,
    }
});



const TransactionSchema = mongoose.model('TransactionSchema', transactionSchema);

export default TransactionSchema;