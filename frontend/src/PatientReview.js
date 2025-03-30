import React, { useState } from 'react';

function PatientReview({ goBack, patients, hospitals, updatePatient }) {
    const [formData, setFormData] = useState({
        patientName: '',       // new field for biodata
        patientAge: '',        // new field for biodata
        patientGender: '',     // new field for biodata
        patientContact: '',    // new field for biodata
        clinicalHistory: '',
        physicalExam: '',
        imagingRequests: {
            xray: false,
            ct: false,
            mri: false,
            ultrasound: false
        },
        labTests: {
            cbc: false,
            cmp: false,
            coagulation: false,
            lipid: false
        },
        additionalComments: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [group, field] = name.split('.');
            setFormData({
                ...formData,
                [group]: { ...formData[group], [field]: type === 'checkbox' ? checked : value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder: send the form data to backend / process review
        alert("Clinical evaluation submitted successfully!");
    };

    const containerStyle = {
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f7f9fc',
        border: '1px solid #dce4ec',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        color: '#333'
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#004080',
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px'
    };

    const sectionHeaderStyle = {
        color: '#004080',
        borderBottom: '2px solid #004080',
        paddingBottom: '5px',
        marginBottom: '15px',
        fontSize: '18px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#004080',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Comprehensive Patient Clinical Evaluation</h2>
            <form onSubmit={handleSubmit}>
                {/* New: Patient Biodata Section */}
                <div>
                    <h3 style={sectionHeaderStyle}>Patient Biodata</h3>
                    <label style={labelStyle} htmlFor="patientName">Name:</label>
                    <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Enter patient's name"
                        required
                    />
                    <label style={labelStyle} htmlFor="patientAge">Age:</label>
                    <input
                        type="number"
                        id="patientAge"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Enter patient's age"
                        required
                    />
                    <label style={labelStyle} htmlFor="patientGender">Gender:</label>
                    <select
                        id="patientGender"
                        name="patientGender"
                        value={formData.patientGender}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <label style={labelStyle} htmlFor="patientContact">Contact:</label>
                    <input
                        type="text"
                        id="patientContact"
                        name="patientContact"
                        value={formData.patientContact}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Enter contact details"
                        required
                    />
                </div>
                <div>
                    <h3 style={sectionHeaderStyle}>Clinical History</h3>
                    <label style={labelStyle} htmlFor="clinicalHistory">History:</label>
                    <textarea
                        id="clinicalHistory"
                        name="clinicalHistory"
                        value={formData.clinicalHistory}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: '80px' }}
                        placeholder="Enter patient's clinical history..."
                        required
                    ></textarea>
                </div>
                <div>
                    <h3 style={sectionHeaderStyle}>Physical Examination Findings</h3>
                    <label style={labelStyle} htmlFor="physicalExam">Examination:</label>
                    <textarea
                        id="physicalExam"
                        name="physicalExam"
                        value={formData.physicalExam}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: '80px' }}
                        placeholder="Enter physical examination details..."
                        required
                    ></textarea>
                </div>
                <div>
                    <h3 style={sectionHeaderStyle}>Imaging Requests</h3>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="imagingRequests.xray"
                            checked={formData.imagingRequests.xray}
                            onChange={handleChange}
                        /> X-Ray
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="imagingRequests.ct"
                            checked={formData.imagingRequests.ct}
                            onChange={handleChange}
                        /> CT Scan
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="imagingRequests.mri"
                            checked={formData.imagingRequests.mri}
                            onChange={handleChange}
                        /> MRI
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="imagingRequests.ultrasound"
                            checked={formData.imagingRequests.ultrasound}
                            onChange={handleChange}
                        /> Ultrasound
                    </label>
                </div>
                <div>
                    <h3 style={sectionHeaderStyle}>Laboratory Test Requests</h3>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="labTests.cbc"
                            checked={formData.labTests.cbc}
                            onChange={handleChange}
                        /> CBC
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="labTests.cmp"
                            checked={formData.labTests.cmp}
                            onChange={handleChange}
                        /> CMP
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="labTests.coagulation"
                            checked={formData.labTests.coagulation}
                            onChange={handleChange}
                        /> Coagulation Panel
                    </label>
                    <label style={labelStyle}>
                        <input
                            type="checkbox"
                            name="labTests.lipid"
                            checked={formData.labTests.lipid}
                            onChange={handleChange}
                        /> Lipid Profile
                    </label>
                </div>
                <div>
                    <h3 style={sectionHeaderStyle}>Additional Comments</h3>
                    <label style={labelStyle} htmlFor="additionalComments">Comments:</label>
                    <textarea
                        id="additionalComments"
                        name="additionalComments"
                        value={formData.additionalComments}
                        onChange={handleChange}
                        style={{ ...inputStyle, height: '60px' }}
                        placeholder="Enter any additional notes..."
                    ></textarea>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button type="submit" style={buttonStyle}>Submit Evaluation</button>
                    <button type="button" style={{ ...buttonStyle, backgroundColor: '#888' }} onClick={goBack}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default PatientReview;
