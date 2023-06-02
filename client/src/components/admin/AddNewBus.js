import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

export default function AddNewBus(props) {
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState([
    {
      Station: "",
      Distance: 0,
      DT: ""
    }
  ])
  // set up states for Bus_name,Bus_number,Type,Fair,DateOfTravel
  const [Bus_name, setBus_name] = useState("");
  const [Bus_number, setBus_number] = useState("");
  const [Type, setType] = useState("");
  const [Fair, setFair] = useState("");
  const [DateOfTravel, setDateOfTravel] = useState(new Date());

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value.toLowerCase();
    setFormFields(data);
  }

  const handleSubmit = async () => {

    const Payload = {
      Bus_name: Bus_name,
      Bus_number: Bus_number,
      Type: Type,
      Fair: Fair,
      Route: formFields,
      DateOfTravel: DateOfTravel
    }
    console.log(Payload);

    await axios.post('/admin/add', Payload)
      .then(function (response) {
        handleOpen();
        props.handleNewBusAdded();
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const addFields = () => {
    let obj = {
      Station: "",
      Distance: 0,
      DT: ""
    }
    setFormFields([...formFields, obj]);
  }
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  }

  const handleOpen = () => setOpen(!open);



  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient" size="sm" color="red">
        Add new Buss
      </Button>
      <Dialog open={open} size="lg" handler={handleOpen} >
        <DialogHeader>Fill New Bus Details</DialogHeader>
        <DialogBody divider>

          <div onSubmit={handleSubmit}>
            <div class="row mx-2 my-2">
              <div class="col">
                <label class="form-label">Bus Name</label>
                <input class="form-control" type="text" placeholder="Enter Bus Name" value={Bus_name} onChange={(event) => setBus_name(event.target.value)} />
              </div>
              <div class="col">
                <label class="form-label">Bus Number</label>
                <input class="form-control" type="text" placeholder="Enter Bus Number" value={Bus_number} onChange={(event) => setBus_number(event.target.value)} />
              </div>
              <div class="col">
                <label class="form-label">Type</label>
                <select class="form-select" aria-label="Default select example" value={Type} onChange={(event) => setType(event.target.value)}>
                  <option value="Non AC Delux">Non AC Delux</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Deluxe Ac">Deluxe Ac</option>
                </select>
              </div>
            </div>
            <div class="row mx-2 my-2">
              <div class="col">
                <label class="form-label">Price per ticket</label>
                <input class="form-control" type="number" placeholder="Enter Pice" value={Fair} onChange={(event) => setFair(event.target.value)} />
              </div>
              <div class="col">
                <label class="form-label">Pic date</label>
                <input class="form-control" type="date" placeholder="Pic Date of travel" value={DateOfTravel} onChange={(event) => setDateOfTravel(event.target.value)} />
              </div>
            </div>
            {/* form data  */}
            {formFields.map((form, index) => {
              return (
                <div class="row mx-2 my-2">

                  <div class="col">
                    <label class="form-label">Station</label>
                    {/* <input class="form-control" type="text" placeholder="Enter Station" name="Station" value={form.Station} onChange={event => handleFormChange(event, index)} /> */}
                    <select class="form-select" aria-label="Default select example" name="Station" onChange={ event => handleFormChange(event,index)}>
                      <option selected value="rourkela">Rourkela</option>  
                      <option value="ranchi">Ranchi</option>
                      <option value="tatanagar">Tatanagar</option>
                      <option value="raipur">Raipur</option>
                    </select>
                  </div>

                  <div class="col">
                    <label class="form-label">Distance</label>
                    <input class="form-control" type="number" placeholder="Enter Distance" name="Distance" value={form.Distance} onChange={event => handleFormChange(event, index)} />
                  </div>

                  <div class="col">
                    <label class="form-label">Departure</label>
                    <input class="form-control" type="time" placeholder="Enter Number" name="DT" value={form.DT} onChange={event => handleFormChange(event, index)} />
                  </div>

                  <div class="col my-auto">
                    <button className="btn btn-danger btn-sm" onClick={() => removeFields(index)} >Remove</button>
                  </div>

                </div>
              )
            })
            }
            <button className="btn btn-outline-secondary mx-6" onClick={addFields}>Add More</button>
          </div>


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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}