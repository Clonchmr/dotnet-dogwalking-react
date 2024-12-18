import { useEffect, useState } from "react";
import {
  assignDogToWalker,
  getAllWalkers,
  removeWalker,
} from "../services/walkerServices";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getCities } from "../services/cityServices";
import "../styles/walkers.css";
import { getDogs } from "../services/dogServices";
import { useNavigate, useParams } from "react-router-dom";

export const AllWalkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [dogsWithoutWalkers, setDogsWithoutWalkers] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentWalker, setCurrentWalker] = useState([]);
  const [dogToAssign, setDogToAssign] = useState({});
  const [activeCard, setActiveCard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllWalkers().then((fetchedWalkers) => {
      setWalkers(fetchedWalkers);
      setFilteredWalkers(fetchedWalkers);
    });
    getCities().then(setCities);
    getDogs().then((dogs) => {
      const dogsWithNoWalker = dogs.filter((dog) => dog.walkerId === null);
      setDogsWithoutWalkers(dogsWithNoWalker);
    });
  }, [walkers.length]);

  const handleFilterWalkers = (e) => {
    const filteredWalkersArr = walkers.filter((w) =>
      w.walkerCities.some(
        (walkerCity) => walkerCity.cityId === parseInt(e.target.value)
      )
    );

    setFilteredWalkers(filteredWalkersArr);

    if (parseInt(e.target.value) === 0) {
      setFilteredWalkers(walkers);
    }
  };

  const findWalkerCities = (walkerCitiesArr, cities) => {
    const citiesArr = walkerCitiesArr.map((wc) => {
      return cities.find((c) => c.id === wc.cityId);
    });

    return citiesArr;
  };

  const handleCardClick = (cardId) => {
    setActiveCard(cardId);
  };

  const handleAssignDog = () => {
    assignDogToWalker(dogToAssign.id, currentWalker.id).then(
      navigate(`/dogdetails/${dogToAssign.id}`)
    );
  };

  const handleDeleteWalker = (walkerId) => {
    removeWalker(walkerId)
      .then(getAllWalkers())
      .then((walkers) => {
        setWalkers(walkers);
      });
  };

  const addDogModal = (walker) => {
    const toggle = () => {
      setModal(!modal);
      setCurrentWalker(walker);
      setActiveCard(false);
      setDogToAssign({});
    };

    const dogsInCity = dogsWithoutWalkers.filter((dog) =>
      currentWalker.walkerCities?.some(
        (walkerCity) => walkerCity.cityId === dog.cityId
      )
    );

    return (
      <div>
        <Button
          className="primary-btn-color mb-3 dog-modal-btn"
          onClick={toggle}
        >
          Add Dog
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Assign Dog to {currentWalker.name}
          </ModalHeader>
          <ModalBody>
            {dogsInCity.length !== 0 ? (
              dogsInCity.map((dc) => (
                <Card
                  key={dc.id}
                  className={`mb-2 add-dog-card ${
                    activeCard === dc.id ? "clicked" : ""
                  }`}
                  onClick={() => {
                    setDogToAssign(dc);
                    handleCardClick(dc.id);
                  }}
                >
                  <CardBody className="d-flex flex-row justify-content-around align-items-center">
                    <CardTitle className="d-flex flex-column">
                      {dc.name}
                    </CardTitle>
                    <CardSubtitle className="text-muted d-flex flex-column">
                      {dc.city.name}
                    </CardSubtitle>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>
                There are currently no unassigned dogs in this walkers cities.
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button className="primary-btn-color" onClick={handleAssignDog}>
              Add
            </Button>
            <Button className="danger-btn-color" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <div className="container walkers-container">
      <Form className="city-select">
        <FormGroup>
          <Label for="citySelect">Filter by city</Label>
          <Input
            type="select"
            name="citySelect"
            id="citySelect"
            onChange={handleFilterWalkers}
          >
            <option value="0">Choose city</option>
            {cities.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
      </Form>
      <div className="walker-cards-container">
        {filteredWalkers.length !== 0 ? (
          filteredWalkers.map((w) => {
            return (
              <Card
                key={w.id}
                className="walker-card d-flex flex-row align-items-center mb-5"
              >
                <div className="flex-grow-1">
                  <CardBody>
                    <CardTitle
                      tag="h5"
                      className="mb-4 hover-cursor"
                      onClick={() => {
                        navigate(`/walkers/edit/${w.id}`);
                      }}
                    >
                      {w.name}
                    </CardTitle>
                    <CardText className="text-muted">Walking in</CardText>
                  </CardBody>
                  <ListGroup flush>
                    {findWalkerCities(w.walkerCities, cities).map((city) => {
                      return (
                        <ListGroupItem key={city?.id}>
                          {city?.name}
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </div>
                <div className="d-flex flex-column justify-content-center p-3">
                  {addDogModal(w)}
                  <Button
                    className="danger-btn-color"
                    onClick={() => {
                      handleDeleteWalker(w.id);
                    }}
                  >
                    Remove Walker
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <h3>No walkers are currently walking in that city.</h3>
        )}
      </div>
    </div>
  );
};
