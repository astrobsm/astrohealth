import React, { useEffect, useState } from 'react';

function HospitalList({ goBack }) {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        fetch('/api/hospitals')
            .then((res) => res.json())
            .then((data) => setHospitals(data))
            .catch((err) => console.error('Error fetching hospitals:', err));
    }, []);

    return (
        <div className="hospital-list-container">
            <h1>Registered Hospitals</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitals.map((hospital, index) => (
                        <tr key={index}>
                            <td>{hospital.hospitalName}</td>
                            <td>{hospital.location}</td>
                            <td>{hospital.contact}</td>
                            <td>{hospital.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="back-button" onClick={goBack}>
                Back
            </button>
        </div>
    );
}

export default HospitalList;
