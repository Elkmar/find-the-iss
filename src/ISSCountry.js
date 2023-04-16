import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ISSCountry.css";

const ISSCountry = ({ latitude, longitude }) => {
  const [locationInfo, setLocationInfo] = useState({});

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b21a7f1223244c2aa53218722f644ce1&language=en`
        );
        const { components } = response.data.results[0];
        const country = components.country;
        const body_of_water = components.body_of_water;

        setLocationInfo({
          country: country,
          body_of_water: body_of_water,
        });
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    if (latitude && longitude) {
      fetchCountryData();
    }
  }, [latitude, longitude]);

  return (
    <p className="country-info">Country: {locationInfo.country || locationInfo.body_of_water || "Unknown"}</p>
  );
};

export default ISSCountry;
