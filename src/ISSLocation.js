import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import GoogleMap from "./GoogleMap";

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
        const response = await axios.get("http://api.open-notify.org/iss-now.json");
        this.setState({
        location: response.data.iss_position,
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
        </div>
        <span className="refresh" onClick={this.refreshLocation}>
          Refresh location
        </span>
      </div>
    );
  }
}

export default ISSLocation;
