import { useEffect, useState } from "react";
import { getDogs } from "../services/dogServices";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import "../styles/dogs.css";

export const AllDogs = () => {
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    getDogs().then(setAllDogs);
  }, []);

  return (
    <div className="container dog-cards-container">
      {allDogs.map((dog) => {
        return (
          <Card key={dog.id} className="dogCard">
            <CardBody>
              <CardTitle className="mb-4" tag="h5">
                {dog.name}
              </CardTitle>
              <CardSubtitle className="mb-4 text-muted" tag="h6">
                {dog.breed.type}
              </CardSubtitle>
              <Button>Remove Dog</Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};
