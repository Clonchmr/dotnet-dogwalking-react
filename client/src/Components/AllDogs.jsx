import { useEffect, useState } from "react";
import { getDogs, removeDog } from "../services/dogServices";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import "../styles/dogs.css";
import { useNavigate } from "react-router-dom";

export const AllDogs = () => {
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    getDogs().then(setAllDogs);
  }, []);

  const navigate = useNavigate();

  const handleRemoveDog = (dogId) => {
    removeDog(dogId).then(
      getDogs().then((dog) => {
        setAllDogs(dog);
      })
    );
  };

  return (
    <div className="container">
      <Button
        className="add-dog-btn primary-btn-color"
        onClick={() => {
          navigate("/add-dog");
        }}
      >
        Add Dog
      </Button>
      <div className="dog-cards-container">
        {allDogs.map((dog) => {
          return (
            <Card key={dog.id} className="dogCard">
              <CardBody>
                <CardTitle
                  className="mb-4 hover-cursor"
                  tag="h5"
                  onClick={() => {
                    navigate(`/dogdetails/${dog.id}`);
                  }}
                >
                  {dog.name}
                </CardTitle>
                <CardSubtitle className="mb-4 text-muted" tag="h6">
                  {dog.breed.type}
                </CardSubtitle>
                <Button
                  className="delete-dog-btn danger-btn-color"
                  onClick={() => {
                    handleRemoveDog(dog.id);
                  }}
                >
                  Remove Dog
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
