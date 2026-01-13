import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ISSMap from "./ISSMap";
import ISSCountry from "./ISSCountry";
import Astronauts from "./Astronauts";
import "./ISSLocation.css";

const ISSLocation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);

      const response = await axios.get(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );

      setData({
        latitude: response.data.latitude.toFixed(4),
        longitude: response.data.longitude.toFixed(4),
        altitude: response.data.altitude.toFixed(1),
        velocity: response.data.velocity.toFixed(1),
        visibility: response.data.visibility
      });
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching ISS data:", err);
      setError("Failed to fetch ISS data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Update every 30 seconds for near real-time tracking
    const interval = setInterval(() => fetchData(false), 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Locating the International Space Station...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h1 className="heading">ISS Tracker</h1>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">ISS Tracker</h1>
      <p className="subheading">
        Real-time position of the International Space Station
      </p>

      <div className="content-wrapper">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="card">
            <div className="card-label">Latitude</div>
            <div className="card-value">
              {data.latitude}
              <span className="card-unit">°</span>
            </div>
          </div>

          <div className="card">
            <div className="card-label">Longitude</div>
            <div className="card-value">
              {data.longitude}
              <span className="card-unit">°</span>
            </div>
          </div>

          <div className="card">
            <div className="card-label">Altitude</div>
            <div className="card-value">
              {data.altitude}
              <span className="card-unit">km</span>
            </div>
          </div>

          <div className="card">
            <div className="card-label">Velocity</div>
            <div className="card-value">
              {Math.round(data.velocity).toLocaleString()}
              <span className="card-unit">km/h</span>
            </div>
          </div>
        </div>

        {/* Country Info */}
        {data.latitude && data.longitude && (
          <ISSCountry
            latitude={data.latitude}
            longitude={data.longitude}
          />
        )}

        {/* Map */}
        {data.latitude && data.longitude && (
          <ISSMap
            latitude={parseFloat(data.latitude)}
            longitude={parseFloat(data.longitude)}
          />
        )}

        {/* Astronauts */}
        <Astronauts />

        {/* Refresh button */}
        <div style={{ textAlign: 'center' }}>
          <button
            className={`refresh ${refreshing ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <span className="spinner" style={{ width: 16, height: 16 }}></span>
                Refreshing...
              </>
            ) : (
              <>
                🔄 Refresh Now
              </>
            )}
          </button>
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ISSLocation;
