import { Fragment, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";

export default function BookTicketsModal(props) {
  const navigate = useNavigate();

  const [onBording, setOnBording] = useState("");
  const [dis, setDis] = useState(0);
  const [code, setCode] = useState("");


  // Modal form popup handling
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    if (props.userData) {
      const postData = {
        UserId: props.userData._id,
        BusName: props.individualBusData.Bus_name,
        Type: props.individualBusData.Type,
        TotalFair: (props.seatsToBook.length * props.individualBusData.Fair) - dis,
        Origin: props.arival[0].Station,
        Destination: props.departure[0].Station,
        Duration: props.duration,
        BookedSeats: props.seatsToBook,
        AlternateOnBording: onBording === "" ? "NIL" : onBording,
        busID: props.individualBusData._id,
        DateOfTravel: props.individualBusData.DateOfTravel
      };

      try {
        await axios.post("/bus/book", postData);
      } catch (error) {
        console.log(error);
      } finally {
        handleOpen();
        navigate("/transaction");
      }
    }
  };

  const handleDis = async (Fair) => {
    try {
      const res = await axios.get(`/admin/coupon/${code}`);
      console.log(res);
      if (res.status === 200) {
        setDis(res.data.CouponValue * 0.01);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_7UP7UhFNLy3YG0",
      amount: data.amount,
      currency: data.currency,
      name: "GET BUS",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log("varify data");
          console.log(data);
          handleSubmit();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const amount = ((props.seatsToBook.length * props.individualBusData.Fair) - dis);
      const orderUrl = "/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: amount });
      console.log("data to pay");
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient" color="red" size="sm">
        Book Ticket
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>
          Please Confirm the details and move ahead with the booking.
        </DialogHeader>
        <DialogBody divider>
          {/* Table  */}
          <table
            class="table  table-striped table-bordered "
            style={{ color: "red" }}
          >
            <thead class="thead-dark">
              <tr>
                <th scope="col">{props.individualBusData.Bus_name}</th>
                <th scope="col">{props.arival[0].Station}</th>
                <th scope="col">Duration</th>
                <th scope="col">{props.departure[0].Station}</th>
                <th scope="col">Fair</th>
                <th scope="col">Seats Available</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{"Type " + props.individualBusData.Type}</th>
                <td>{props.arival[0].DT}</td>
                <td>{props.duration + "  hh:mm"}</td>
                <td>{props.departure[0].DT}</td>
                
                <td>
                  Inr <b>{props.individualBusData.Fair}</b>
                </td>
                <td>
                  <b>
                    {props.individualBusData.TotalSeat -
                      props.individualBusData.BookedSeats.length}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ color: "black" }}>
                  Seat numbers : <b> {props.seatsToBook.toString()} </b>
                </td>
                <td colSpan={2} style={{ color: "black" }}>
                  Total Price :{" "}
                  <b>
                    {" "}
                    {(props.seatsToBook.length *
                      props.individualBusData.Fair) - dis}{" "}
                  </b>
                </td>
                <td colSpan={2} style={{ color: "black" }}>
                  <Input
                    label="Enter discount code if any"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button className="btn btn-danger btn-sm mt-1" onClick={(e) => handleDis(props.seatsToBook.length * props.individualBusData.Fair)} >Apply</button>
                </td>
                <td colSpan={2} style={{ color: "black" }}>
                  <Input
                    label="Enter on bording stop if any"
                    value={onBording}
                    onChange={(e) => setOnBording(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handlePayment}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
