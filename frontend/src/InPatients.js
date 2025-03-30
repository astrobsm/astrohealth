import React, { useState } from 'react';
import PatientTrackRecord from './PatientTrackRecord'; // Import the new component

function InPatients({ goBack, patients }) {
    const [selectedPatient, setSelectedPatient] = useState(null);

    if (selectedPatient) {
        return (
            <PatientTrackRecord
                patient={selectedPatient}
                goBack={() => setSelectedPatient(null)}
            />
        );
    }

    return (
        <div className="patients-list-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>In-Patients</h1>
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Condition</th>
                        <th>Contact</th>
                        <th>Hospital</th>
                        <th>Date of Registration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.condition}</td>
                            <td>{patient.contact}</td>
                            <td>{patient.hospital}</td>
                            <td>{patient.date}</td>
                            <td>
                                <button
                                    className="track-record-button"
                                    onClick={() => setSelectedPatient(patient)}
                                >
                                    Track Record
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={goBack}>
                Back
            </button>
        </div>
    );
}

export default InPatients;
