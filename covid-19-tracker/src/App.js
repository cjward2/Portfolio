import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCopuntries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //Run api calls on intial render
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        //Set state with data recieved
        setCountryInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //cycle through data coming back to get country name and country abbreviation.
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //Sort data recieved using sortData function from util.js
          const sortedData = sortData(data);
          //Set state with sorted data so Table is organized
          setTableData(sortedData);
          //Set state to be passed down to map component
          setMapCopuntries(data);
          setCountries(countries);
        })
        .catch((err) => console.log(err));
    };

    getCountriesData();

    
  }, []);

  
  const onCountryChange = (event) => {
    //Set countryCode variable to event.target.value and use to build endpoint
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //Set state
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(countryCode);
        //If worldwide is clicked move map back to this lat and long
        if(countryCode === "worldwide") {
          setMapCenter({ lat: 34.80746, lng: -40.4796 }); 
        }
        //Otherwise move map to country lat and long
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Cycle through countries to build menu List */}
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
