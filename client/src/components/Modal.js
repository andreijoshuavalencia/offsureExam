import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";

function CarModal(props) {
  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/").pop();
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [details, setDetails] = useState({
    id: id,
    year: "",
    make: "",
    model: "",
    price: "",
    isDealer: 0,
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/create/car", details);
      window.location.reload();
    } catch (err) {
      console.log("error: " + err);
    }
  };

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedDetails = { ...details };

    if (type === "checkbox") {
      updatedDetails[name] = checked ? 1 : 0;
      setIsChecked(checked);
    } else {
      updatedDetails[name] = value;
    }

    setDetails(updatedDetails);
  };

  console.log(details);

  return (
    <div>
      <Button className="w-25 mb-3" onClick={handleOpenModal}>
        {props.func}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.func}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content goes here...</p>
          <Form>
            <Form.Label>Year</Form.Label>
            <Form.Control type="text" name="year" onChange={changeHandler} />
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" name="make" onChange={changeHandler} />
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" name="model" onChange={changeHandler} />
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" onChange={changeHandler} />
            <Form.Check
              type="checkbox"
              label="Dealer"
              name="isDealer"
              checked={isChecked}
              onChange={changeHandler}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CarModal;
