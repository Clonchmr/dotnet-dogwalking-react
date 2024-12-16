import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet, Route, Routes } from "react-router-dom";
import { AllDogs } from "./Components/AllDogs";
import { NavBar } from "./Components/Navbar/NavBar";
import Home from "./Home";
import { DogDetails } from "./Components/DogDetails";
import { AddDog } from "./Forms/AddDog";
import { AllWalkers } from "./Components/AllWalkers";
import { AllCities } from "./Components/AllCities";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            <Route
              index
              element={
                <>
                  <Home />
                  <AllDogs />
                </>
              }
            />
            <Route path="dogdetails/:dogId" element={<DogDetails />} />
            <Route path="add-dog" element={<AddDog />} />
            <Route path="walkers" element={<AllWalkers />} />
            <Route path="cities" element={<AllCities />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
