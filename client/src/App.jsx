import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet, Route, Routes } from "react-router-dom";
import { AllDogs } from "./Components/AllDogs";
import { NavBar } from "./Components/Navbar/NavBar";
import Home from "./Home";
import { DogDetails } from "./Components/DogDetails";

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
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
