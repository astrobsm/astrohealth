import React, { useState } from 'react';

function RegisterHospital({ goBack }) {
    const [hospitalName, setHospitalName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hospitalName || !location || !contact || !capacity) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await fetch('/api/register-hospital', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hospitalName, location, contact, capacity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            alert('Hospital registered successfully!');
            setHospitalName('');
            setLocation('');
            setContact('');
            setCapacity('');
        } catch (err) {
            console.error('Error registering hospital:', err);
            alert('An error occurred while registering the hospital. Please try again.');
        }
    };

    return (
        <div className="register-hospital-container">
            <h1>Register a Hospital</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input
                    type="text"
                    id="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                    required
                />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter hospital location"
                    required
                />
                <label htmlFor="contact">Contact:</label>
                <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter contact details"
                    required
                />
                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter hospital capacity"
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

export default RegisterHospital;
