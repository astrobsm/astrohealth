import React, { useState } from 'react';
import jsPDF from 'jspdf';

function DischargeProtocols({ goBack }) {
    const [formData, setFormData] = useState({
        patientName: '',
        surgeryType: '',
        vitalStability: false,
        woundStatus: false,
        painControl: false,
        oralIntake: false,
        mobility: false,
        medicationReview: false,
        followUpScheduled: false,
        educationCompleted: false,
        homeSupport: false,
        additionalFields: {}, // Store additional field values
    });

    const [status, setStatus] = useState('');
    const [instructions, setInstructions] = useState(null);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (name.startsWith('additionalFields.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                additionalFields: { ...formData.additionalFields, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        }
    };

    const evaluateDischarge = () => {
        const allCriteriaMet = Object.keys(formData)
            .filter((key) => key !== 'patientName' && key !== 'surgeryType' && key !== 'additionalFields')
            .every((key) => formData[key]);

        if (allCriteriaMet) {
            setStatus('Ready for Discharge');
            generateDischargeInstructions();
        } else {
            setStatus('Not Ready for Discharge');
            generateActionPlan();
        }
    };

    const generateDischargeInstructions = () => {
        const instructionsBySurgery = {
            "Skin Grafting": [
                "Do not disturb primary dressing for 5–7 days.",
                "Elevate limb (if limb-based).",
                "Avoid pressure on graft or flap site.",
                "Follow-up in 5–7 days for dressing change and graft take review.",
                "High-protein diet + multivitamins (Zinc, Vit C).",
            ],
            "Diabetic Foot Ulcer Debridement": [
                "Continue daily dressing at home or nearest clinic.",
                "Offloading instructions (e.g., crutches, orthotic shoe).",
                "Antibiotics and glycemic control medications.",
                "Blood sugar monitoring at home with logbook.",
                "Weekly follow-up for wound reassessment.",
            ],
            // Add other surgery types here...
        };

        setInstructions(instructionsBySurgery[formData.surgeryType] || []);
    };

    const generateActionPlan = () => {
        setInstructions([
            "Ensure vital stability (afebrile, hemodynamically stable).",
            "Confirm wound status is clean and dry or appropriate dressing is in place.",
            "Manage pain with oral analgesics.",
            "Ensure patient is tolerating oral feeds or has an enteral/parenteral plan.",
            "Confirm mobility with or without assistive devices.",
            "Reconcile and explain all prescriptions to the patient.",
            "Schedule follow-up appointments.",
            "Complete patient/caregiver education on wound care, red flags, and medications.",
            "Ensure caregiver presence or referral for home care if needed.",
        ]);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Discharge Protocols', 10, 10);
        doc.setFontSize(12);
        doc.text(`Patient Name: ${formData.patientName}`, 10, 20);
        doc.text(`Surgery Type: ${formData.surgeryType}`, 10, 30);
        doc.text(`Status: ${status}`, 10, 40);
        doc.text('Instructions:', 10, 50);
        instructions.forEach((instruction, index) => {
            doc.text(`${index + 1}. ${instruction}`, 10, 60 + index * 10);
        });
        doc.save(`${formData.patientName}_Discharge_Protocols.pdf`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        evaluateDischarge();
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Discharge Protocols</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="patientName">Patient Name:</label>
                <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient's name"
                    required
                />
                <label htmlFor="surgeryType">Surgery Type:</label>
                <select
                    id="surgeryType"
                    name="surgeryType"
                    value={formData.surgeryType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select surgery type</option>
                    <option value="Skin Grafting">Skin Grafting</option>
                    <option value="Diabetic Foot Ulcer Debridement">Diabetic Foot Ulcer Debridement</option>
                    <option value="Hand Infections">Hand Infections</option>
                    <option value="Pressure Sore Reconstruction">Pressure Sore Reconstruction</option>
                    <option value="Abdominoplasty">Abdominoplasty</option>
                    <option value="Breast Reconstruction">Breast Reconstruction</option>
                    <option value="Liposuction">Liposuction</option>
                    <option value="Cleft Lip / Cleft Palate Repair">Cleft Lip / Cleft Palate Repair</option>
                    <option value="Keloid Excision">Keloid Excision</option>
                    <option value="Ingrown Toenail Excision">Ingrown Toenail Excision</option>
                </select>
                <h3>Discharge Readiness Checklist</h3>
                {[
                    { label: 'Vital Stability', name: 'vitalStability', fields: ['Temperature (°C)', 'Systolic BP (mmHg)', 'Diastolic BP (mmHg)', 'Pulse Rate (bpm)', 'Respiratory Rate (breaths/min)'] },
                    { label: 'Wound Status', name: 'woundStatus', dropdown: true, options: ['Extension', 'Transition', 'Indolent', 'Repair'] },
                    { label: 'Pain Control', name: 'painControl', field: 'Pain Level (0-10)' },
                    { label: 'Oral Intake', name: 'oralIntake', field: 'Diet Tolerance' },
                    { label: 'Mobility', name: 'mobility', field: 'Mobility Status' },
                    { label: 'Medication Review', name: 'medicationReview', field: 'Prescriptions Reconciled' },
                    { label: 'Follow-up Scheduled', name: 'followUpScheduled', field: 'Follow-up Date' },
                    { label: 'Patient/Caregiver Education', name: 'educationCompleted', field: 'Education Notes' },
                    { label: 'Support at Home', name: 'homeSupport', field: 'Caregiver Details' },
                ].map((item, index) => (
                    <div key={index}>
                        <label htmlFor={item.name}>
                            <input
                                type="checkbox"
                                id={item.name}
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleChange}
                            />
                            {item.label}
                        </label>
                        {formData[item.name] && item.fields && item.fields.map((field, fieldIndex) => (
                            <input
                                key={fieldIndex}
                                type="text"
                                id={`additionalFields.${field}`}
                                name={`additionalFields.${field}`}
                                placeholder={`Enter ${field}`}
                                value={formData.additionalFields[field] || ''}
                                onChange={handleChange}
                                required
                            />
                        ))}
                        {formData[item.name] && item.dropdown && (
                            <select
                                id={`additionalFields.${item.name}`}
                                name={`additionalFields.${item.name}`}
                                value={formData.additionalFields[item.name] || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select phase</option>
                                {item.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                        {formData[item.name] && item.field && (
                            <input
                                type="text"
                                id={`additionalFields.${item.field}`}
                                name={`additionalFields.${item.field}`}
                                placeholder={`Enter ${item.field}`}
                                value={formData.additionalFields[item.field] || ''}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Evaluate</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            {status && (
                <div className="evaluation-result">
                    <h3>Status: {status}</h3>
                    <h4>Instructions:</h4>
                    <ul>
                        {instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                    <button onClick={exportToPDF}>Export as PDF</button>
                </div>
            )}
        </div>
    );
}

export default DischargeProtocols;
