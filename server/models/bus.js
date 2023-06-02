import mongoose from "mongoose";

const busSchema = mongoose.Schema({
    Bus_name: {
        type: String,
        required: true
    },
    Bus_number: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Fair: {
        type: Number,
        required: true
    },
    TotalSeat: {
        type: Number,
        default: 30
    },
    Route:[
        {
            Station:{type: String},
            DT:{type: String},
            Distance:{type: Number},
        }
    ],
    BookedSeats:{
        type: Array,
        default: []
    },
    DateOfTravel:{
        type: String
    }
});



const BusSchema = mongoose.model('BusSchema', busSchema);

export default BusSchema;