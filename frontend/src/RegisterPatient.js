import React, { useState, useEffect } from 'react';

function RegisterPatient({ goBack, addPatient }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        condition: '',
        contact: '',
        hospital: '',
        date: new Date().toISOString().split('T')[0], // Default to today's date
        patientType: '', // New field for patient type
    });
    const [hospitals, setHospitals] = useState([]);

    // Fetch hospital names from the backend
    useEffect(() => {
        fetch('/api/hospitals')
            .then((res) => res.json())
            .then((data) => setHospitals(data))
            .catch((err) => console.error('Error fetching hospitals:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPatient(formData); // Pass the form data to the parent component
        alert('Patient registered successfully!');
        goBack(); // Navigate back to the Patient Management page
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Register a Patient</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter patient's name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter patient's age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="condition">Condition:</label>
                <input
                    type="text"
                    id="condition"
                    name="condition"
                    placeholder="Enter patient's condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="contact">Contact:</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Enter contact details"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="hospital">Hospital Name:</label>
                <select
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a hospital</option>
                    {hospitals.map((hospital, index) => (
                        <option key={index} value={hospital}>
                            {hospital}
                        </option>
                    ))}
                </select>
                <label htmlFor="patientType">Patient Type:</label>
                <select
                    id="patientType"
                    name="patientType"
                    value={formData.patientType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select patient type</option>
                    <option value="In-patient">In-patient</option>
                    <option value="Out-patient">Out-patient</option>
                    <option value="Homecare">Homecare</option>
                </select>
                <label htmlFor="date">Date of Registration:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default RegisterPatient;
