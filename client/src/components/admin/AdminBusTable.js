import React from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
function List(props) {
  const data = props.data;
  const listItems = data.map((newData) => (
    <tr>
      <td colSpan={2}>Station: {newData.Station}</td>
      <td colSpan={2}>Departure : {newData.DT}</td>
      <td colSpan={2}>Distance: {newData.Distance}</td>
    </tr>
  ));
  return <tbody>{listItems}</tbody>;
}

function AdminBusTable(props) {
  const removeBus = (value) => {
    axios
      .post("/bus/remove", {
        busID: value,
      })
      .then(function (response) {
        props.handleNewBusAdded();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <table
        className="table  table-striped table-bordered mt-4"
        style={{ color: "red" }}
      >
        <thead class="thead-dark">
          <tr>
            <th scope="col">Buss Name</th>
            <th scope="col">Bus Number</th>
            <th scope="col">Type</th>
            <th scope="col">Fair</th>
            <th scope="col">Total Seats</th>
            <th scope="col">Available Seats</th>
            <th scope="col">Date of Travel</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">{props.data.Bus_name}</th>
            <th scope="col">{props.data.Bus_number}</th>
            <th scope="col">{props.data.Type}</th>
            <th scope="col">{props.data.Fair}</th>
            <th scope="col">{props.data.TotalSeat}</th>
            <th scope="col">
              {props.data.TotalSeat - props.data.BookedSeats.length}
            </th>
            <th scope="col">{props.data.DateOfTravel}</th>

          </tr>
        </tbody>
        <List data={props.data.Route} />
        <tbody>
          <th colSpan={6}>
            {" "}
            Seats Booked: {props.data.BookedSeats.toString()}
          </th>
          <th>
            <button
              type="button"
              className="btn btn-dange"
              color="red"
              onClick={() => removeBus(props.data._id)}
            >
              Remove Bus
            </button>
          </th>
        </tbody>
      </table>
    </div>
  );
}

export default AdminBusTable;
