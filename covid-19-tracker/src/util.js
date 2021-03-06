import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//Defining circle color and multiplier to be shown on map
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 200,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 300,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1000,
  },
};

//Function to Sort data being shown in table
export const sortData = data => {
    let sortedData = [...data];
    return sortedData.sort((a, b) => b.cases - a.cases);
  };

  //Function to format stats being sent to InfoBox
  export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  //Function to set circles on Map
  export const showDataOnMap = (data, casesType='cases') => {
    return data.map(country => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
        </Popup>
      </Circle>
    ))


  };