import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Selection from "./components/Selection/Selection";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countrySelected, setCountrySelected] = useState("");
  const [stateSelected, setStateSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");

  async function performApiCall(url, setApiData) {
    try {
      let data = await axios.get(url);
      // console.log(data.data);
      setApiData(data.data);
    } catch (error) {
      console.error(`the error is:${error}`);
    }
  }

  useEffect(() => {
    performApiCall(
      "https://crio-location-selector.onrender.com/countries",
      setCountries
    );
  }, []);

  useEffect(() => {
    if (countrySelected) {
      performApiCall(
        `https://crio-location-selector.onrender.com/country=${countrySelected}/states`,
        setStates
      );
      setStateSelected("");
      setCities([]);
      setCitySelected("");
    }

    // console.log("from state");
  }, [countrySelected]);

  useEffect(() => {
    if (countrySelected && stateSelected) {
      performApiCall(
        `https://crio-location-selector.onrender.com/country=${countrySelected}/state=${stateSelected}/cities`,
        setCities
      );
      setCitySelected("");
    }

    // console.log("from countries");
  }, [countrySelected, stateSelected]);

  function handleSelection(event, setSelection) {
    console.log(event.target.value);
    setSelection(event.target.value);
  }

  return (
    <>
      <h1 style={{ fontFamily: "cursive" }}>Select Location</h1>
      <div className="location-wrap">
        <Selection
          data={countries}
          name="country"
          current={countrySelected}
          handlerfun={(event) => handleSelection(event, setCountrySelected)}
          isvisible={true}
        />
        <Selection
          data={states}
          name="state"
          current={stateSelected}
          handlerfun={(event) => handleSelection(event, setStateSelected)}
          isvisible={countrySelected}
        />
        <Selection
          data={cities}
          name="city"
          current={citySelected}
          handlerfun={(event) => handleSelection(event, setCitySelected)}
          isvisible={stateSelected}
        />
      </div>
      {citySelected && (
        <h2 className="result">
          You selected <span className="highlight">{citySelected}</span>,
          <span className="fade">
            {" "}
            {stateSelected}, {countrySelected}
          </span>
        </h2>
      )}
    </>
  );
}

export default App;
