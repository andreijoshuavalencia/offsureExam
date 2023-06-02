import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

function Car() {
  const [backendData, setBackendData] = useState([{}]);
  const [comments, setComment] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split("/").pop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8081/create/comment/${id}`, comments);
      window.location.reload();
    } catch (err) {
      console.log("error: " + err);
    }
  };

  const changeHandler = (event) => {
    try {
      setComment([{
        [event.target.name]: event.target.value,
      }]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/car/${id}`);
        setBackendData(res.data.cars);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [id]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/comments/${id}`);

        setComment(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [id]);

  return (
    <ListGroup variant="flush">
      {backendData.map((car) => (
        <div>
          <h1>
            {car.make} {car.model} {car.year}
          </h1>
          <ListGroup.Item>₱ {car.price}</ListGroup.Item>

          {car.isDealer === 0 ? (
            <div>
              <h3>Contact Person</h3>
              <ListGroup.Item>{car.name}</ListGroup.Item>
              <ListGroup.Item>{car.phone}</ListGroup.Item>
              <ListGroup.Item>{car.email}</ListGroup.Item>
            </div>
          ) : (
            "Dealer ABN"
          )}
        </div>
      ))}
      <h4>Comments</h4>
      <p>
        {comments.map((data) => (
          <p>{data.comment}</p>
        ))}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Control
          onChange={changeHandler}
          className="me-3 w-25 text-center"
          name="comment"
          placeholder="Write a comment"
        ></Form.Control>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </ListGroup>
  );
}

export default Car;
