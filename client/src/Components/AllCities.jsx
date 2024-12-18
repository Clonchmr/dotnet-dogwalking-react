import { useEffect, useState } from "react";
import { addCity, getCities } from "../services/cityServices";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getAllWalkers } from "../services/walkerServices";
import "../styles/cities.css";

export const AllCities = () => {
  const [allCities, setAllCities] = useState([]);
  const [allWalkers, setAllWalkers] = useState([]);
  const [modal, setModal] = useState(false);
  const [newCity, setNewCity] = useState({});

  useEffect(() => {
    getCities().then(setAllCities);
    getAllWalkers().then(setAllWalkers);
  }, []);

  const filterWalkersByCity = (cityId) => {
    const filteredWalkers = allWalkers.filter((w) => {
      return w.walkerCities.some((wc) => wc.cityId === cityId);
    });

    return filteredWalkers;
  };

  const handleAddCity = () => {
    addCity(newCity)
      .then(() => getCities())
      .then((cities) => setAllCities(cities));
  };

  const addCityModal = () => {
    const toggle = () => setModal(!modal);

    return (
      <div>
        <Button className="primary-btn-color mb-5" onClick={toggle}>
          Add City
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add a City</ModalHeader>
          <ModalBody>
            <Form>
              <Label for="city-name">City Name</Label>
              <Input
                id="city-name"
                type="text"
                required
                placeholder="Enter name"
                onChange={(e) => {
                  const copy = { ...newCity };
                  copy.name = e.target.value;
                  setNewCity(copy);
                }}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="primary-btn-color"
              onClick={() => {
                handleAddCity();
                toggle();
              }}
            >
              Add
            </Button>
            <Button className="danger-btn-color" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      {addCityModal()}
      <div className=" cities-container">
        {allCities.map((c) => {
          return (
            <Card key={c.id} className="mb-4 city-card">
              <CardBody className="d-flex flex-row justify-content-evenly align-items-center">
                <CardTitle className="d-flex flex-column">{c.name}</CardTitle>
                <CardSubtitle className="d-flex flex-column text-muted">
                  {filterWalkersByCity(c.id).length}{" "}
                  {filterWalkersByCity(c.id).length > 1 ? "walkers" : "walker"}
                </CardSubtitle>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
