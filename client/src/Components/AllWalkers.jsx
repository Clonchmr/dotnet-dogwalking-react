import { useEffect, useState } from "react";
import { getAllWalkers } from "../services/walkerServices";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { getCities } from "../services/cityServices";
import "../styles/walkers.css";

export const AllWalkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllWalkers().then((fetchedWalkers) => {
      setWalkers(fetchedWalkers);
      setFilteredWalkers(fetchedWalkers);
    });
    getCities().then(setCities);
  }, []);

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
                    <CardTitle tag="h5" className="mb-4">
                      {w.name}
                    </CardTitle>
                    <CardText className="text-muted">Walking in</CardText>
                  </CardBody>
                  <ListGroup flush>
                    {findWalkerCities(w.walkerCities, cities).map((city) => {
                      return (
                        <ListGroupItem key={city.id}>
                          {city?.name}
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </div>
                <div className="d-flex flex-column justify-content-center p-3">
                  <Button className="mb-5 primary-btn-color">Add Dog</Button>
                  <Button className="danger-btn-color">Remove Walker</Button>
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
