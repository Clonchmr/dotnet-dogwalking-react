import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getBreeds, postNewBreed } from "../services/breedServices";
import { getCities } from "../services/cityServices";
import { addNewDog } from "../services/dogServices";
import { useNavigate } from "react-router-dom";

export const AddDog = () => {
  const [breeds, setBreeds] = useState([]);
  const [cities, setCities] = useState([]);
  const [newDog, setNewDog] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getCities().then(setCities);
  }, [cities.length]);

  useEffect(() => {
    getBreeds().then(setBreeds);
  }, [breeds.length]);

  const handleAddDog = (e) => {
    e.preventDefault();
    addNewDog(newDog).then((response) => {
      navigate(`/dogdetails/${response.id}`);
    });
  };

  const addBreedModal = () => {
    const [modal, setModal] = useState(false);
    const [newBreed, setNewBreed] = useState({});

    const toggle = () => setModal(!modal);

    const handleAddBreed = async () => {
      await postNewBreed(newBreed);
      const updatedBreeds = await getBreeds();
      setBreeds(updatedBreeds);

      toggle();
    };

    return (
      <div>
        <Button onClick={toggle} color="" outline className="openModalBtn">
          Don't see your breed? Click here to add one.
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Breed</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="newBreed">Breed name</Label>
                <Input
                  id="newBreed"
                  name="newBreed"
                  type="text"
                  placeholder="Enter new breed..."
                  required
                  onChange={(e) => {
                    const copy = { ...newBreed };
                    copy.type = e.target.value;
                    setNewBreed(copy);
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button className="primary-btn-color" onClick={handleAddBreed}>
              Submit
            </Button>
            {""}
            <Button className="danger-btn-color" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  return (
    <Form className="container">
      <h2 className="mt-5">Add a new dog</h2>
      <FormGroup>
        <Label for="dog-name">Name</Label>
        <Input
          id="dog-name"
          name="dogName"
          placeholder="Enter dog name..."
          type="text"
          required
          onChange={(e) => {
            const copy = { ...newDog };
            copy.name = e.target.value;
            setNewDog(copy);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="breed-choice">Breed</Label>
        <Input
          id="breed-choice"
          name="breedSelect"
          type="select"
          required
          className="mb-3"
          onChange={(e) => {
            const copy = { ...newDog };
            copy.breedId = parseInt(e.target.value);
            setNewDog(copy);
          }}
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => {
            return (
              <option key={breed.id} value={breed.id}>
                {breed.type}
              </option>
            );
          })}
        </Input>
        {addBreedModal()}
      </FormGroup>
      <FormGroup>
        <Label for="city-select">City</Label>
        <Input
          id="city-select"
          name="citySelect"
          type="select"
          required
          onChange={(e) => {
            const copy = { ...newDog };
            copy.cityId = parseInt(e.target.value);
            setNewDog(copy);
          }}
        >
          <option value="">Choose city</option>
          {cities.map((city) => {
            return (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <Button
        className="primary-btn-color add-dog-form-btn"
        onClick={handleAddDog}
      >
        Add
      </Button>
    </Form>
  );
};
