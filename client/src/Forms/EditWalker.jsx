import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWalkerById,
  getWalkerCities,
  newWalkerCity,
  removeWalkerCity,
  updateWalker,
} from "../services/walkerServices";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getCities } from "../services/cityServices";

export const EditWalker = () => {
  const [currentWalker, setCurrentWalker] = useState({});
  const [allCities, setAllCities] = useState([]);
  const [cityChoices, setCityChoices] = useState(
    currentWalker?.walkerCities?.map((wc) => wc.cityId) || []
  );
  const [walkerCities, setWalkerCities] = useState([]);

  const { walkerId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getWalkerById(walkerId).then(setCurrentWalker);
    getCities().then(setAllCities);
    getWalkerCities().then(setWalkerCities);
  }, [walkerId]);

  useEffect(() => {
    const walkerCityIds =
      currentWalker.walkerCities?.map((wc) => wc.cityId) || [];
    setCityChoices(walkerCityIds);
  }, [currentWalker]);

  const handleCityChoice = (cityId, isChecked) => {
    if (isChecked) {
      return setCityChoices([...cityChoices, cityId]);
    } else {
      setCityChoices(cityChoices.filter((cc) => cc != cityId));
    }
  };

  const handleUpdateWalker = async (e) => {
    e.preventDefault();

    const citiesToAdd = cityChoices.filter(
      (cityChoice) =>
        !walkerCities.some(
          (wc) => wc.cityId === cityChoice && wc.walkerId === currentWalker.id
        )
    );
    const citiesToRemove = walkerCities.filter(
      (wc) =>
        wc.walkerId === currentWalker.id && !cityChoices.includes(wc.cityId)
    );

    await updateWalker(currentWalker);

    await Promise.all(
      citiesToAdd.map(async (ctA) => {
        const walkerCityObj = {
          walkerId: currentWalker.id,
          cityId: ctA,
        };
        return newWalkerCity(walkerCityObj);
      })
    );

    await Promise.all(
      citiesToRemove.map(async (ctR) => {
        return removeWalkerCity(ctR.id);
      })
    );
    navigate("/walkers");
  };

  return (
    <div className="container">
      <Form>
        <FormGroup>
          <Label for="update-walker-name">Update Name</Label>
          <Input
            id="update-walker-name"
            type="text"
            value={currentWalker.name}
            required
            onChange={(e) => {
              const copy = { ...currentWalker };
              copy.name = e.target.value;
              setCurrentWalker(copy);
            }}
          />
        </FormGroup>
        <FormGroup>
          {allCities.map((city) => {
            return (
              <Label key={city.id}>
                <Input
                  type="checkbox"
                  name="cityChoice"
                  value={city.id}
                  checked={cityChoices.includes(city.id)}
                  onChange={(e) => handleCityChoice(city.id, e.target.checked)}
                />
                {city.name}
              </Label>
            );
          })}
        </FormGroup>
        <Button className="primary-btn-color" onClick={handleUpdateWalker}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
