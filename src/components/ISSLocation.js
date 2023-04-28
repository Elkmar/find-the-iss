import React, { Component } from "react";
import axios from "axios";
import ISSMap from "./ISSMap";
import ISSCountry from "./ISSCountry";
import "./ISSLocation.css";


class ISSLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
        location: {},
        };

        this.fetchData = this.fetchData.bind(this);
        this.refreshLocation = this.refreshLocation.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
        this.interval = setInterval(this.fetchData, 5 * 60 * 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.location !== this.state.location) {
        console.log("Location updated!");
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async fetchData() {
      const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
      this.setState({
        location: {
          latitude: response.data.latitude.toFixed(2),
          longitude: response.data.longitude.toFixed(2)
        },
      });
    }

    async refreshLocation() {
        await this.fetchData();
    }

    render() {
        const { location } = this.state;

    return (
      <div className="container">
        <h1 className="heading">ISS Location</h1>
        <div className="location">
          <p className="latitude">Latitude: {location.latitude}</p>
          <p className="longitude">Longitude: {location.longitude}</p>
          {location.latitude && location.longitude && (
            <ISSCountry
              latitude={location.latitude}
              longitude={location.longitude}
            />
          )}
        </div>
        {location.latitude && location.longitude && (
          <ISSMap
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}
        <span className="refresh" onClick={this.refreshLocation}>
          Refresh location
        </span>
      </div>
    );
  }
}

export default ISSLocation;
