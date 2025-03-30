import React, { useState } from 'react';

function RescheduleSurgery({ surgery, goBack }) {
    const [formData, setFormData] = useState({
        date: surgery.date,
        time: surgery.time,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Surgery rescheduled to ${formData.date} at ${formData.time}`);
        goBack();
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Reschedule Surgery</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="date">New Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="time">New Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Reschedule</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default RescheduleSurgery;
