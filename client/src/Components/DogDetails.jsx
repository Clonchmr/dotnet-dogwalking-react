import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDogById } from "../services/dogServices";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

export const DogDetails = () => {
  const [currentDog, setCurrentDog] = useState({});

  const { dogId } = useParams();

  useEffect(() => {
    getDogById(dogId).then(setCurrentDog);
  }, [dogId]);
  return (
    <Card className="mt-5 dog-details-card">
      <CardBody>
        <CardTitle tag="h4" className="mb-5">
          Name: {currentDog.name}
        </CardTitle>
        <CardSubtitle tag="h6" className="text-muted mb-5">
          Breed: {currentDog.breed?.type}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="text-muted mb-5">
          City: {currentDog.city?.name}
        </CardSubtitle>
        <CardText className="mb-3">
          Current Walker:{" "}
          {currentDog.walker != null
            ? currentDog.walker?.name
            : "No walker currently assigned"}
        </CardText>
      </CardBody>
    </Card>
  );
};
