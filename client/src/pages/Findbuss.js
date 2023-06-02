import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Autocompleteinput from "../components/Form/AutocompleteInput";
import BussListView from "../components/buss/BussListView";
import { diff } from "../components/utils/UsefulFunctions";
const Findbuss = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(Date);
  const [busData, setBusData] = useState([]);

  //filters and sort
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");

  const calulateDuration = (value) => {
    //fix passigin oorigin and duration and send this function in util
    const arival = value.Route.filter((obj) => obj.Station == origin);
    const departure = value.Route.filter((obj) => obj.Station == destination);
    const duration = diff(arival[0].DT, departure[0].DT);
    return duration;
  };

  const handleFilterSort = () => {
    if (sort == "price") {
      setBusData((busData) => [
        ...busData.sort((a, b) => (a.Fair > b.Fair ? 1 : -1)),
      ]);
    }
    if (sort == "duration") {
      setBusData((busData) => [
        ...busData.sort((a, b) =>
          calulateDuration(a) > calulateDuration(b) ? 1 : -1
        ),
      ]);
    }
    if (type == "Non AC Delux") {
      setBusData((busData) => [...busData.filter((obj) => obj.Type == "Non AC Delux")])
    }
    if (type == "AC") {
      setBusData((busData) => [...busData.filter((obj) => obj.Type == "AC")])
    }
    if (type == "Non-AC") {
      setBusData((busData) => [...busData.filter((obj) => obj.Type == "Non-AC")])
    }
    if (type == "Deluxe Ac") {
      setBusData((busData) => [...busData.filter((obj) => obj.Type == "Deluxe Ac")])
    }

  };

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

      console.log(res.status);

      if (!(res.status === 200)) {
        window.alert("u are loged out");
        navigate("/login");
      } else {
        console.log("welcome" + data.name);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {

      const res = await axios.get(
        `/bus/${origin.toLowerCase()}/${destination.toLowerCase()}/${date}`
      );
      console.log(res.data);
      setBusData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value, from) => {
    if (from === "origin") {
      setOrigin(value.toLowerCase());
    }
    if (from === "destination") {
      setDestination(value.toLowerCase());
    }
    if (from === "date") {
      setDate(value);
    }
  };

  useEffect(() => {
    isLogedIn();
  }, []);

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Find Buss
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep.
            </p>
          </div>
          <div class="flex  w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div class="relative flex-grow w-full">
              <Autocompleteinput
                handleChange={handleChange}
                from={"origin"}
                lable="origin"
              />
            </div>
            <div class="relative flex-grow w-full">
              <Autocompleteinput
                handleChange={handleChange}
                from={"destination"}
                lable="destination"
              />
            </div>
            <div class="relative flex-grow w-full">
              <input
                type="date"
                class="date form-control"
                onChange={(e) => handleChange(e.target.value, "date")}
              />
            </div>
            <button
              onClick={handleSubmit}
              class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {busData.length != 0 && (
        <section class="text-gray-600 body-font container  my-4">
          <div class="flex  w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div class="relative flex-grow w-full">
              <h6>Available Buses</h6>
            </div>
            <div class="relative flex-grow w-full">
              <label for="sortBy">Sort By</label>
              <select
                class="form-select"
                onChange={(e) => setSort(e.target.value)}
              >
                <option selected value="price">
                  Price
                </option>
                <option value="duration">Duration</option>
              </select>
            </div>
            <div class="relative flex-grow w-full">
              <label for="BusType">Bus Type</label>
              <select
                class="form-select"
                onChange={(e) => setType(e.target.value)}
              >
                <option selected value="Any">
                  Any
                </option>
                <option value="Non AC Delux">Non AC Delux</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Deluxe Ac">Deluxe Ac</option>
              </select>
            </div>
            <div class="relative flex-grow w-full">
              <button
                class="text-white bg-red-500 border-0 py-2 px-2 ml-10 focus:outline-none hover:bg-red-600 rounded text-sm"
                onClick={() => handleFilterSort()}
              >
                Apply filters
              </button>
            </div>
          </div>
        </section>
      )}
      {busData.length === 0 && (
        <div className="container justify-content-center text-center">
          <h5>No bus Available</h5>
        </div>
      )}

      <section className="container">
        {busData.map((individualBusData) => (
          <BussListView
            userData={userData}
            individualBusData={individualBusData}
            origin={origin.toLowerCase()}
            destination={destination.toLowerCase()}
          />
        ))}
      </section>
    </>
  );
};

export default Findbuss;
