import BusSchema from "../models/bus.js";
import CouponSchema from "../models/coupon.js";
export const getAdminBus = async (req, res) => {
  try {
    const filter = {};
    const BusData = await BusSchema.find(filter);
    if (BusData) {
      res.status(200).send(BusData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No busses found" + error.message })
  }
};

export const editAdminBus = async (req, res) => { };

export const addAdminBus = async (req, res) => {
  const { Bus_name, Bus_number, Type, Fair, TotalSeat, Route, DateOfTravel } =
    req.body;
  if (!Bus_name || !Bus_number || !Type || !Fair || !Route) {
    res
      .status(400)
      .json({ message: "Please enter all the details.  bus was not added." });
  } else {
    try {
      const newBus = new BusSchema({
        Bus_name,
        Bus_number,
        Type,
        Fair,
        TotalSeat,
        Route,
        DateOfTravel
      });
      const newBusAdded = await newBus.save();
      console.log(newBusAdded);
      if (newBusAdded) {
        console.log("new buss added to the databse");
        res.status(200).json({ message: "Buss Added" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "bus was not added :" + error.message });
    }
  }
};

export const addAdminCoupon = async (req, res) => {
  const { CouponName, CouponValue } = req.body;

  if (!CouponName || !CouponValue) {
    res.status(400).json({ message: "Please enter all the required fields" });
  }
  try {
    const newCoupon = new CouponSchema({ CouponName, CouponValue });
    const newCouponAdded = await newCoupon.save();
    console.log(newCouponAdded);
    if (newCouponAdded) {
      console.log("new Coupon added to the database");
      res.status(200).json({ message: "Coupon Added" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }

}
export const viewAdminCoupon = async (req, res) => {
  try {
    const data = await CouponSchema.find({});
    if (data) {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(400).json({ message: "cant fetch transactions" });
    console.log(error);
  }
}

export const deleteCoupon = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "please send the id of coupon to be deleted" })
  }
  try {
    await CouponSchema.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Coupon removed" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const verifyAdminCoupon = async (req, res) => {
  const name = req.params.name;
  try {
    const data = await CouponSchema.findOne({ CouponName: name });
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).json({ message: "Coupon is not valid" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}