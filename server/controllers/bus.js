import BusSchema from "../models/bus.js"
import TransactionSchema from "../models/transaction.js";
export const getBus = async (req, res) => {
    const origin = req.params.origin;
    const destination = req.params.destination;
    const date = req.params.date;
    if (!origin || !destination) {
        res.status(400).json({ message: "Please enter all the fields" });
    }
    console.log(date);
    try {
        const filter = { $and: [{ "Route.Station": origin }, { "Route.Station": destination },{DateOfTravel: date}] };
        const busDetails = await BusSchema.find(filter);
        if (busDetails) {
            res.status(200).send(busDetails);
        } else {
            res.status(400).json({ message: "Unable to get bus" });
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }

}

export const bookTicket = async (req, res) => {
    const { UserId, BusName, Type, TotalFair, Origin, Destination, Duration, BookedSeats, AlternateOnBording, busID, DateOfTravel} = req.body;

    //To DO VALIDATION
    try {
        const newTransiction = new TransactionSchema({ UserId, BusName, Type, TotalFair, Origin, Destination, Duration, BookedSeats, AlternateOnBording, busID, DateOfTravel });
        const newTransictionAdded = await newTransiction.save();
        const updated_bus = await BusSchema.findOneAndUpdate({ _id: busID }, { $push: { BookedSeats: { $each: BookedSeats } } })

        if (updated_bus) {
            console.log("updated Bus");
        }

        if (newTransictionAdded) {
            console.log("New transaction added");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }

    res.status(200).send("new transiction added");
}

export const viewTransaction = async (req, res) => {

    const UserID = req.params.userid;
    console.log(UserID);
    try {
        const data = await TransactionSchema.find({ UserId: UserID });
        if (data) {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(400).json({ message: "cant fetch transactions" });
        console.log(error);
    }
}

export const cancelTicket = async (req, res) => {
    const { TransictionId, busID, BookedSeats } = req.body;
    try {
        const updated_bus = await BusSchema.findOneAndUpdate({ _id: busID }, { $pull: { BookedSeats: { $in: BookedSeats } } });
        const update_trans = await TransactionSchema.findOneAndUpdate({ _id: TransictionId }, { Status: "cancel" });
        res.status(200).json({ message: "data updated" });
    } catch (error) {
        res.status(400).json({ message: "data Not updated" });
    }
}

export const removeBus = async (req, res) => {
    const { busID } = req.body;

    try {
        await BusSchema.findOneAndDelete({ _id: busID });
        res.status(200).json({ message: "Bus Removed" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}