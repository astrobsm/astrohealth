import React from 'react';

function PatientsList({ goBack, patients }) {
    return (
        <div className="patients-list-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Patients List</h1>
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Condition</th>
                        <th>Contact</th>
                        <th>Hospital</th>
                        <th>Patient Type</th>
                        <th>Date of Registration</th>
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
                            <td>{patient.patientType}</td>
                            <td>{patient.date}</td>
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

export default PatientsList;
