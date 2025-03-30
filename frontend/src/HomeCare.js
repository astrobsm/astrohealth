import React, { useState } from 'react';
import HomecarePatients from './HomecarePatients'; // Import the new component

function HomeCare({ goBack, patients = [] }) {
    const [showHomecarePatients, setShowHomecarePatients] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        relativeContact: '',
    });

    if (showHomecarePatients) {
        const homecarePatients = patients.filter(
            (patient) => patient.patientType === 'Homecare'
        ); // Filter homecare patients
        return (
            <HomecarePatients
                goBack={() => setShowHomecarePatients(false)}
                patients={homecarePatients}
            />
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Home-care patient registered successfully!');
        goBack(); // Navigate back to the Patient Management page
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Register Home-Care Patient</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Patient Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter patient's name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    name="address"
                    placeholder="Enter patient's address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                ></textarea>
                <label htmlFor="relativeContact">Relative's Contact:</label>
                <input
                    type="text"
                    id="relativeContact"
                    name="relativeContact"
                    placeholder="Enter relative's contact number"
                    value={formData.relativeContact}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            <button
                className="management-button"
                onClick={() => setShowHomecarePatients(true)}
            >
                View Homecare Patients
            </button>
        </div>
    );
}

export default HomeCare;
