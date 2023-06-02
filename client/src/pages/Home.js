import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import { Button } from "react-bootstrap";
import CarModal from "../components/Modal";

function Home() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:8081/cars");
        console.log(res.data.cars);
        setBackendData(res.data.cars);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      <h1>Cars List</h1>
      <CarModal func="Create Car"/>
      {/* <Link to="/add"><Button className="mb-3" variant="info">Add a user</Button></Link> */}
      {backendData.length === 0 ? (
        <h5>No Data Available</h5>
      ) : (
        <DataTable props={backendData} />
      )}
    </div>
  );
}

export default Home;
