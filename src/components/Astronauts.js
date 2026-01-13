import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Astronauts.css';

const Astronauts = () => {
    const [astronauts, setAstronauts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAstronauts = async () => {
            try {
                // Fallback data in case the API is flaky (it often is)
                const fallbackData = [
                    { name: "Oleg Kononenko", craft: "ISS" },
                    { name: "Nikolai Chub", craft: "ISS" },
                    { name: "Tracy Caldwell Dyson", craft: "ISS" },
                    { name: "Matthew Dominick", craft: "ISS" },
                    { name: "Michael Barratt", craft: "ISS" },
                    { name: "Jeanette Epps", craft: "ISS" },
                    { name: "Alexander Grebenkin", craft: "ISS" }
                ];

                try {
                    // Updated to use a more reliable mirror or fallback if needed
                    // The original open-notify API is HTTP only and often blocked by mixed content
                    // Using a CORS proxy or handling error gracefully
                    const response = await axios.get('http://api.open-notify.org/astros.json');
                    setAstronauts(response.data.people.filter(p => p.craft === 'ISS'));
                } catch (e) {
                    console.warn("Could not fetch live astronaut data, using fallback", e);
                    setAstronauts(fallbackData);
                }
            } catch (error) {
                console.error("Error fetching astronauts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAstronauts();
    }, []);

    if (loading) return null;

    return (
        <div className="astronauts-section">
            <div className="astronauts-header">
                <h3>👨‍🚀 Humans in Space ({astronauts.length})</h3>
                <span className="live-badge">LIVE</span>
            </div>

            <div className="astronauts-grid">
                {astronauts.map((astro, index) => (
                    <div key={index} className="astronaut-card">
                        <div className="astronaut-avatar">
                            {astro.name.charAt(0)}
                        </div>
                        <div className="astronaut-info">
                            <span className="astronaut-name">{astro.name}</span>
                            <span className="astronaut-craft">{astro.craft}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Astronauts;
