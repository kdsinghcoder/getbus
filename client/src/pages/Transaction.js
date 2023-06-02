import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { color } from "@mui/system";

const Transaction = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [triger,setTriger]=useState(false);
  const [login, setlogin] = useState(false);
  const isLogedIn = async () => {
    try {
      const res = await fetch("/isLogedIn", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!(res.status === 200)) {
        navigate("/login");
      } else {
        setlogin(true);
        fetchData();

        console.log("welcome" + data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/bus/transaction/${userData._id}`);
      console.log(res.data);
      setTransaction(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CancelTicket = async(value) => {
    const payload = {
      TransictionId: value._id,
      busID: value.busID,
      BookedSeats: value.BookedSeats
    }
    await axios.post('/bus/cancel', payload)
    .then(function (response) {
      // window.location.reload();
      setTriger(!triger);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const createInvoice = async(inputData)=>{
       const data = {
        "customize": {
        },
        "images": {
            "logo": "https://t3.ftcdn.net/jpg/02/27/31/70/360_F_227317080_XuwcT5p1nzRcAVg6wA9PwMZF9uD1tDkG.jpg",
            "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
        },
        "sender": {
            "company": "GET BUS",
            "address": "Kormangla",
            "zip": "1234 AB",
            "city": "Banglore",
            "country": "INDIA"
        },
        "client": {
            "company": userData.name,
            "address": userData.email,
        },
        "information": {
            "number": "2021.0001",
            "date": inputData.DateOfTravel,
            "due-date": inputData.DateOfTravel
        },
        "products": [
            {
                "quantity": 1,
                "description": "Tickets booked" + inputData.BookedSeats.toString() + "IN BUS- " + inputData.BusName ,
                "tax-rate": 0,
                "price": inputData.TotalFair
            },
        ],
        "bottom-notice": "Thanks for using GET BUS",
        "settings": {
            "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        },
        "translate": {
           
        },
    };
        const result = await window.easyinvoice.createInvoice(data);
        window.easyinvoice.download('myInvoice.pdf', result.pdf);
  }
  
  useEffect(() => {
    isLogedIn();
  }, [login,triger]);

  return (
    <div className="container mt-8">
      <h3>Your Transaction History</h3>
      {transaction.map((individualTransaction) => (
        <table
          className="table  table-striped table-bordered mt-4"
          style={{ color: "red" }}
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">Buss Name</th>
              <th scope="col">Origin</th>
              <th scope="col">Duration</th>
              <th scope="col">Destination</th>
              <th scope="col">Total Fair</th>
              <th scope="col">Alternate Bording</th>
              <th scope="col">Seats</th>
              <th scope="col">Date Of travel</th>
              <th scope="col" style={{ color: "green" }}>
                {individualTransaction.Status}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{individualTransaction.BusName}</th>
              <td>{individualTransaction.Origin}</td>
              <td>{individualTransaction.Duration}</td>
              <td>{individualTransaction.Destination}</td>
              <td>Inr : {individualTransaction.TotalFair}</td>
              <td>{individualTransaction.AlternateOnBording}</td>
              <td>{individualTransaction.BookedSeats.toString()}</td>
              <td>{individualTransaction.DateOfTravel}</td>
              {individualTransaction.Status == "Success" && (
                <td>
                  <button type="button" className="btn btn-danger btn-sm mx-2" onClick={() => CancelTicket(individualTransaction)}>
                    Cancel Ticket
                  </button>
                  <button type="button" className="btn btn-info btn-sm mx-2" onClick={() => createInvoice(individualTransaction)}>
                    Invoice
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Transaction;
