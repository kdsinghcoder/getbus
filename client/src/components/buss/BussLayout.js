import React, { useState, useEffect } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { generateSeatStatus } from "../utils/UsefulFunctions.js";
function BussLayout(props) {
  var seatStatus = generateSeatStatus(props.bookedSeats);

  const [status, setStatus] = useState(seatStatus);
  const [seatsToBook, setSeatsToBook] = useState([]);

  const handleClick = (value) => {
    if (status[value].colour == "green") {
      status[value].colour = "grey";
      setStatus(status);
      setSeatsToBook([...seatsToBook, status[value].number]);
    } else if (status[value].colour == "grey") {
      status[value].colour = "green";
      setStatus(status);

      let filteredArray = seatsToBook.filter((item) => item !== value + 1);
      setSeatsToBook(filteredArray);
    }
  };
  useEffect(() => {
    props.sendParentValue(seatsToBook);
  }, [seatsToBook]);

  return (
    <div>
      <table
        class="table border border-dark"
        style={{ borderRadius: "20px !important" }}
      >
        <tbody>
          <tr>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[0].colour}`}
                onClick={(event) => handleClick(0)}
                style={{ "pointer-events": `${status[0].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[1].colour}`}
                onClick={(event) => handleClick(1)}
                style={{ "pointer-events": `${status[1].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[2].colour}`}
                onClick={(event) => handleClick(2)}
                style={{ "pointer-events": `${status[2].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[3].colour}`}
                onClick={(event) => handleClick(3)}
                style={{ "pointer-events": `${status[3].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[4].colour}`}
                onClick={(event) => handleClick(4)}
                style={{ "pointer-events": `${status[4].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[5].colour}`}
                onClick={(event) => handleClick(5)}
                style={{ "pointer-events": `${status[5].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[6].colour}`}
                onClick={(event) => handleClick(6)}
                style={{ "pointer-events": `${status[6].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[7].colour}`}
                onClick={(event) => handleClick(7)}
                style={{ "pointer-events": `${status[7].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[8].colour}`}
                onClick={(event) => handleClick(8)}
                style={{ "pointer-events": `${status[8].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[9].colour}`}
                onClick={(event) => handleClick(9)}
                style={{ "pointer-events": `${status[9].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[10].colour}`}
                onClick={(event) => handleClick(10)}
                style={{ "pointer-events": `${status[10].disable}` }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[11].colour}`}
                onClick={(event) => handleClick(11)}
                style={{ "pointer-events": `${status[11].disable}` }}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[12].colour}`}
                onClick={(event) => handleClick(12)}
                style={{ "pointer-events": `${status[12].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[13].colour}`}
                onClick={(event) => handleClick(13)}
                style={{ "pointer-events": `${status[13].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[14].colour}`}
                onClick={(event) => handleClick(14)}
                style={{ "pointer-events": `${status[14].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[15].colour}`}
                onClick={(event) => handleClick(15)}
                style={{ "pointer-events": `${status[15].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[16].colour}`}
                onClick={(event) => handleClick(16)}
                style={{ "pointer-events": `${status[16].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[17].colour}`}
                onClick={(event) => handleClick(17)}
                style={{ "pointer-events": `${status[17].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[18].colour}`}
                onClick={(event) => handleClick(18)}
                style={{ "pointer-events": `${status[18].disable}` }}
              />
            </td>
            <td></td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[19].colour}`}
                onClick={(event) => handleClick(19)}
                style={{ "pointer-events": `${status[19].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[20].colour}`}
                onClick={(event) => handleClick(20)}
                style={{ "pointer-events": `${status[20].disable}` }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[21].colour}`}
                onClick={(event) => handleClick(21)}
                style={{ "pointer-events": `${status[21].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[22].colour}`}
                onClick={(event) => handleClick(22)}
                style={{ "pointer-events": `${status[22].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[23].colour}`}
                onClick={(event) => handleClick(23)}
                style={{ "pointer-events": `${status[23].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[24].colour}`}
                onClick={(event) => handleClick(24)}
                style={{ "pointer-events": `${status[24].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[25].colour}`}
                onClick={(event) => handleClick(25)}
                style={{ "pointer-events": `${status[25].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[26].colour}`}
                onClick={(event) => handleClick(26)}
                style={{ "pointer-events": `${status[26].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[27].colour}`}
                onClick={(event) => handleClick(27)}
                style={{ "pointer-events": `${status[27].disable}` }}
              />
            </td>
            <td></td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[28].colour}`}
                onClick={(event) => handleClick(28)}
                style={{ "pointer-events": `${status[28].disable}` }}
              />
            </td>
            <td>
              <MdAirlineSeatReclineNormal
                size={30}
                color={`${status[29].colour}`}
                onClick={(event) => handleClick(29)}
                style={{ "pointer-events": `${status[29].disable}` }}
              />
            </td>
            <td>
              <GiSteeringWheel size={32} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BussLayout;
