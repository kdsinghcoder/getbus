import React, { useEffect, useState } from "react";
import BussLayout from "./BussLayout";
import { AiFillStar } from "react-icons/ai";
import { diff } from "../utils/UsefulFunctions";
import BookTicketsModal from "./BookTicketsModal.js"


function BussListView(props) {
  const [toggle, setToggle] = useState(false);

  const arival =props.individualBusData.Route.filter(obj=> obj.Station == `${props.origin}`)
  const departure =props.individualBusData.Route.filter(obj=> obj.Station == `${props.destination}`)

  console.log( arival);
  const duration = diff(arival[0].DT,departure[0].DT);
  const [seatsToBook, setSeatsToBook]= useState([]);
  const sendParentValue = (value) =>{
    setSeatsToBook(value);
  }

  return (
    <div>
      <table
        class="table  table-striped table-bordered "
        style={{ color: "red" }}
      >
        <thead class="thead-dark">
          <tr>
            <th scope="col">{props.individualBusData.Bus_name}</th>
            <th scope="col">Departure</th>
            <th scope="col">Duration</th>
            <th scope="col">Arrival</th>
            <th scope="col">Fair</th>
            <th scope="col">Seats Available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{"Type "+ props.individualBusData.Type}</th>
            <td>{arival[0].DT}</td>
            <td>{ duration + "  hh:mm"}</td>
            <td>{departure[0].DT}</td>
            
            <td>
              Inr <b>{props.individualBusData.Fair}</b>
            </td>
            <td>
              <b>
              {props.individualBusData.TotalSeat-props.individualBusData.BookedSeats.length}
              </b>
              <button
                class="text-white bg-red-500 border-0 py-2 px-2 ml-10 focus:outline-none hover:bg-red-600 rounded text-sm"
                onClick={() => setToggle(!toggle)}
              >View Seats
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
      {toggle && (
        <div class="card">
          <div class="card-header">Choose Seats : <b> {seatsToBook.toString()} </b></div>
          <div class="card-body">
            {/* Buss Layout */}
            <BussLayout bookedSeats={props.individualBusData.BookedSeats} sendParentValue={sendParentValue}/>
          </div>
          <div class="card-body text-right">
            <BookTicketsModal userData={props.userData} individualBusData={props.individualBusData} seatsToBook={seatsToBook} arival={arival} departure={departure} duration={duration}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default BussListView;
