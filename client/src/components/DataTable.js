import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

function DataTable({ props }) {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive="sm" className="text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Year</th>
            <th>Make</th>
            <th>Model</th>
            <th>Price (₱)</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.id}>
              <td>
                <Link to={`/car/${prop.id}`}>{prop.id}</Link>
              </td>
              <td>{prop.year}</td>
              <td>{prop.model}</td>
              <td>{prop.make}</td>
              <td>{prop.price}</td>
              <td className="w-25">
                <Link to={`/edit/${prop.id}`}>
                  <Button className=" w-25 px-3 mx-3">Update</Button>
                </Link>
                <Button
                  className="px-3"
                  variant="danger"
                  onClick={() => handleDelete(prop.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
