import React, { useState } from 'react';

function PatientTrackRecord({ patient, goBack }) {
    const [condition, setCondition] = useState(patient.condition);
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
        alert('Patient condition updated successfully!');
        goBack();
    };

    return (
        <div className="track-record-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Track Record for {patient.name}</h1>
            <form className="track-record-form" onSubmit={handleSubmit}>
                <label htmlFor="condition">Update Condition:</label>
                <textarea
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    rows="4"
                    placeholder="Enter updated condition"
                    required
                ></textarea>
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
                <button type="button" className="back-button" onClick={goBack}>
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

export default PatientTrackRecord;
