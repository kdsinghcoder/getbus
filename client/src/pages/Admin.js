import React from "react";
import { useEffect, useState } from "react";
import AdminBusTable from "../components/admin/AdminBusTable.js";
import axios from "axios";
import AddNewBus from "../components/admin/AddNewBus.js"
import AdminLogin from "../components/admin/AdminLogin.js";
import AdminNav from "../components/AdminNav.js";
import CouponTab from "../components/admin/CouponTab.js";
function Admin() {
  const [busData, setBusData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const fetchData = () => {
    axios
      .get("/admin")
      .then(function (response) {
        setBusData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNewBusAdded = () => {
    fetchData();
  }

  const handleLogin = (value) => {
    setIsLogin(value);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <AdminNav />
    <div className="container mt-8">
      <div>
        <h3>All Busses</h3>
        <AddNewBus handleNewBusAdded={handleNewBusAdded} className="mx-3" />
        <CouponTab />
        {isLogin === false &&
          <AdminLogin handleLogin={handleLogin} className="mx-3" />
        }
      </div>
      <div>
        {busData.map((data) => (
          <AdminBusTable data={data} handleNewBusAdded={handleNewBusAdded} />
        ))}
      </div>
    </div>
    </>

  );
}

export default Admin;
