import React, { useState } from 'react';
import jsPDF from 'jspdf';
import BookedSurgeries from './BookedSurgeries'; // Import the new BookedSurgeries component

function BookSurgery({ goBack }) {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        ward: '',
        hospital: '',
        anaesthesiaType: '',
        diathermy: false,
        surgeryName: '',
        bodyPart: '',
        bloodProducts: false,
        bloodProductType: '', // New field for type of blood product
        bloodProductUnits: '', // New field for number of units
        surgeryDate: '', // Field for proposed surgery date
        surgeryTime: '', // Field for proposed surgery time
    });

    const [showBookedSurgeries, setShowBookedSurgeries] = useState(false); // State for navigating to booked surgeries

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        exportToPDF();
        alert('Surgery booked successfully!');
        goBack();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Surgery Booking Details', 10, 10);
        doc.setFontSize(12);
        doc.text(`Name: ${formData.name}`, 10, 20);
        doc.text(`Gender: ${formData.gender}`, 10, 30);
        doc.text(`Ward: ${formData.ward}`, 10, 40);
        doc.text(`Hospital: ${formData.hospital}`, 10, 50);
        doc.text(`Anaesthesia Type: ${formData.anaesthesiaType}`, 10, 60);
        doc.text(`Need for Diathermy: ${formData.diathermy ? 'Yes' : 'No'}`, 10, 70);
        doc.text(`Surgery Name: ${formData.surgeryName}`, 10, 80);
        doc.text(`Body Part: ${formData.bodyPart}`, 10, 90);
        doc.text(`Proposed Surgery Date: ${formData.surgeryDate}`, 10, 100);
        doc.text(`Proposed Surgery Time: ${formData.surgeryTime}`, 10, 110);
        doc.text(`Need for Blood Products: ${formData.bloodProducts ? 'Yes' : 'No'}`, 10, 120);
        if (formData.bloodProducts) {
            doc.text(`Blood Product Type: ${formData.bloodProductType}`, 10, 130);
            doc.text(`Number of Units: ${formData.bloodProductUnits}`, 10, 140);
        }
        doc.save(`${formData.name}_Surgery_Booking.pdf`);
    };

    if (showBookedSurgeries) {
        return <BookedSurgeries goBack={() => setShowBookedSurgeries(false)} />;
    }

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Book Surgery</h1>
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
                <label htmlFor="ward">Ward:</label>
                <input
                    type="text"
                    id="ward"
                    name="ward"
                    placeholder="Enter ward"
                    value={formData.ward}
                    onChange={handleChange}
                    required
                />
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
                <label htmlFor="anaesthesiaType">Anaesthesia Type:</label>
                <select
                    id="anaesthesiaType"
                    name="anaesthesiaType"
                    value={formData.anaesthesiaType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select anaesthesia type</option>
                    <option value="General">General</option>
                    <option value="Local">Local</option>
                    <option value="Regional">Regional</option>
                </select>
                <label htmlFor="diathermy">Need for Diathermy:</label>
                <input
                    type="checkbox"
                    id="diathermy"
                    name="diathermy"
                    checked={formData.diathermy}
                    onChange={handleChange}
                />
                <label htmlFor="surgeryName">Name of Surgery:</label>
                <input
                    type="text"
                    id="surgeryName"
                    name="surgeryName"
                    placeholder="Enter name of surgery"
                    value={formData.surgeryName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="bodyPart">Part of the Body:</label>
                <input
                    type="text"
                    id="bodyPart"
                    name="bodyPart"
                    placeholder="Enter part of the body"
                    value={formData.bodyPart}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="surgeryDate">Proposed Surgery Date:</label>
                <input
                    type="date"
                    id="surgeryDate"
                    name="surgeryDate"
                    value={formData.surgeryDate}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="surgeryTime">Proposed Surgery Time:</label>
                <input
                    type="time"
                    id="surgeryTime"
                    name="surgeryTime"
                    value={formData.surgeryTime}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="bloodProducts">Need for Blood Products:</label>
                <input
                    type="checkbox"
                    id="bloodProducts"
                    name="bloodProducts"
                    checked={formData.bloodProducts}
                    onChange={handleChange}
                />
                {formData.bloodProducts && (
                    <>
                        <label htmlFor="bloodProductType">Type of Blood Product:</label>
                        <input
                            type="text"
                            id="bloodProductType"
                            name="bloodProductType"
                            placeholder="Enter type of blood product"
                            value={formData.bloodProductType}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="bloodProductUnits">Number of Units:</label>
                        <input
                            type="number"
                            id="bloodProductUnits"
                            name="bloodProductUnits"
                            placeholder="Enter number of units"
                            value={formData.bloodProductUnits}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                <button type="submit">Book Surgery</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            <button
                className="management-button"
                onClick={() => setShowBookedSurgeries(true)}
            >
                View Booked Surgeries
            </button>
        </div>
    );
}

export default BookSurgery;
