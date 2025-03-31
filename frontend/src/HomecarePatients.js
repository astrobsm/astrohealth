import React, { useState } from 'react';

function HomecarePatients({ goBack, patients }) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [labResults, setLabResults] = useState([]);
    const [clinicalPhotos, setClinicalPhotos] = useState([]);

    const handleLabUpload = (e) => {
        const files = Array.from(e.target.files);
        setLabResults([...labResults, ...files]);
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setClinicalPhotos([...clinicalPhotos, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Updates saved successfully!');
        setSelectedPatient(null); // Reset selected patient
    };

    if (selectedPatient) {
        return (
            <div className="track-record-container">
                <div className="logo-container">
                    <img src="/assets/logo.png" alt="AstroHealth Logo" />
                </div>
                <h1>Update Records for {selectedPatient.name}</h1>
                <form className="track-record-form" onSubmit={handleSubmit}>
                    <label htmlFor="labResults">Upload Lab Results:</label>
                    <input
                        type="file"
                        id="labResults"
                        multiple
                        onChange={handleLabUpload}
                    />
                    <label htmlFor="clinicalPhotos">Upload Clinical Photos:</label>
                    <input
                        type="file"
                        id="clinicalPhotos"
                        multiple
                        onChange={handlePhotoUpload}
                    />
                    <button type="submit">Save Updates</button>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => setSelectedPatient(null)}
                    >
                        Back
                    </button>
                </form>
                <div className="uploads-section">
                    <h3>Uploaded Lab Results:</h3>
                    <ul>
                        {labResults.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                    <h3>Uploaded Clinical Photos:</h3>
                    <ul>
                        {clinicalPhotos.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="patients-list-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Homecare Patients</h1>
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Relative's Contact</th>
                        <th>Presenting Complaints</th>
                        <th>Next Review Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.address || 'N/A'}</td>
                            <td>{patient.relativeContact || 'N/A'}</td>
                            <td>{patient.presentingComplaints || 'N/A'}</td>
                            <td>{patient.nextReviewDate || 'N/A'}</td>
                            <td>
                                <button
                                    className="track-record-button"
                                    onClick={() => setSelectedPatient(patient)}
                                >
                                    Update Records
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

export default HomecarePatients;
