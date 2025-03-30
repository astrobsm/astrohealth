import React, { useState, useEffect } from 'react';

function BookAppointment({ goBack }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        reason: '',
        hospital: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);
        scheduleReminders(appointmentDateTime);
        alert('Appointment booked successfully!');
        goBack();
    };

    const scheduleReminders = (appointmentDateTime) => {
        const now = new Date();
        const reminders = [
            { time: 24 * 60 * 60 * 1000, message: '24 hours before the appointment' },
            { time: 12 * 60 * 60 * 1000, message: '12 hours before the appointment' },
            { time: 6 * 60 * 60 * 1000, message: '6 hours before the appointment' },
        ];

        reminders.forEach(({ time, message }) => {
            const reminderTime = appointmentDateTime - time;
            if (reminderTime > now) {
                setTimeout(() => {
                    const audio = new Audio('/assets/reminder.mp3'); // Reminder sound
                    audio.play();
                    alert(`Reminder: ${message}`);
                }, reminderTime - now);
            }
        });
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Book an Appointment</h1>
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
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <label htmlFor="reason">Reason for Appointment:</label>
                <textarea
                    id="reason"
                    name="reason"
                    placeholder="Enter reason for appointment"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="3"
                    required
                ></textarea>
                <label htmlFor="hospital">Hospital:</label>
                <select
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a hospital</option>
                    <option value="Hospital A">Hospital A</option>
                    <option value="Hospital B">Hospital B</option>
                    <option value="Hospital C">Hospital C</option>
                </select>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Book Appointment</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default BookAppointment;
