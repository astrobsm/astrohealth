import React, { useState } from 'react';
import BookSurgery from './BookSurgery'; // Import the BookSurgery component

function PreOpEvaluation({ goBack }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        typeOfSurgery: '',
        urgency: '',
        anaesthesiaType: '',
        comorbidities: {
            hypertension: false,
            diabetes: false,
            renalDisease: false,
            liverDisease: false,
            pulmonaryDisease: false,
            heartFailure: false,
            hiv: false,
            tuberculosis: false,
            cancer: false,
            stroke: false,
        },
        medications: '',
        vitals: {
            systolicBP: '',
            diastolicBP: '',
            pulse: '',
            rr: '',
            temp: '',
            spo2: '',
        },
        labs: {
            hb: '',
            wbc: '',
            platelets: '',
            sodium: '',
            potassium: '',
            creatinine: '',
            fastingBloodSugar: '', // New field for fasting blood sugar
            randomBloodSugar: '', // New field for random blood sugar
            ast: '',
            alt: '',
            inr: '',
            glucose: '',
        },
        gfr: '', // Autogenerated GFR field
        drugAdjustmentRecommendation: '', // Recommendation based on GFR
    });

    const [readinessScore, setReadinessScore] = useState(null);
    const [readinessStatus, setReadinessStatus] = useState('');
    const [showBookSurgery, setShowBookSurgery] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('comorbidities.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                comorbidities: { ...formData.comorbidities, [field]: type === 'checkbox' ? checked : value },
            });
        } else if (name.startsWith('vitals.') || name.startsWith('labs.')) {
            const field = name.split('.')[1];
            const section = name.startsWith('vitals.') ? 'vitals' : 'labs';
            setFormData({
                ...formData,
                [section]: { ...formData[section], [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const calculateGFR = () => {
        const { creatinine, gender, age } = formData.labs;
        if (!creatinine || !gender || !age) return null;

        const creatinineValue = parseFloat(creatinine);
        const kappa = gender === 'Male' ? 0.9 : 0.7;
        const alpha = gender === 'Male' ? -0.411 : -0.329;
        const minScr = Math.min(creatinineValue / kappa, 1);
        const maxScr = Math.max(creatinineValue / kappa, 1);

        // CKD-EPI Equation
        const gfr = (
            141 *
            Math.pow(minScr, alpha) *
            Math.pow(maxScr, -1.209) *
            Math.pow(0.993, parseInt(age, 10)) *
            (gender === 'Female' ? 1.018 : 1)
        ).toFixed(2);

        let recommendation = '';
        if (gfr < 30) {
            recommendation = 'Severe renal impairment. Adjust all renally excreted drugs.';
        } else if (gfr < 60) {
            recommendation = 'Moderate renal impairment. Adjust doses for renally excreted drugs.';
        } else {
            recommendation = 'Normal renal function. No dose adjustment needed.';
        }

        setFormData({ ...formData, gfr, drugAdjustmentRecommendation: recommendation });
    };

    const calculateReadinessScore = () => {
        let score = 0;

        // Example scoring logic
        if (formData.vitals.systolicBP && parseInt(formData.vitals.systolicBP, 10) < 140) score += 10;
        if (formData.comorbidities.hypertension) score -= 5;
        if (formData.labs.hb && parseFloat(formData.labs.hb) > 10) score += 10;

        // Add more scoring logic here...

        return Math.max(0, Math.min(100, score)); // Ensure score is between 0 and 100
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateGFR();
        const score = calculateReadinessScore();
        setReadinessScore(score);

        if (score >= 85) {
            setReadinessStatus('READY');
            setShowBookSurgery(true);
        } else if (score >= 70) {
            setReadinessStatus('NOT FULLY READY');
        } else {
            setReadinessStatus('NOT READY');
        }
    };

    if (showBookSurgery) {
        return <BookSurgery goBack={() => setShowBookSurgery(false)} />;
    }

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Pre-op Evaluation</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Patient Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Enter patient name"
                    required
                />
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    aria-label="Enter patient age"
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
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="height">Height (cm):</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="typeOfSurgery">Type of Surgery:</label>
                <input
                    type="text"
                    id="typeOfSurgery"
                    name="typeOfSurgery"
                    value={formData.typeOfSurgery}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="urgency">Urgency:</label>
                <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select urgency</option>
                    <option value="Elective">Elective</option>
                    <option value="Emergency">Emergency</option>
                </select>
                <label htmlFor="anaesthesiaType">Planned Anaesthesia Type:</label>
                <select
                    id="anaesthesiaType"
                    name="anaesthesiaType"
                    value={formData.anaesthesiaType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select anaesthesia type</option>
                    <option value="Local">Local</option>
                    <option value="Regional">Regional</option>
                    <option value="General">General</option>
                </select>
                <h3>Comorbidities:</h3>
                {Object.keys(formData.comorbidities).map((key) => (
                    <div key={key}>
                        <label htmlFor={`comorbidities.${key}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="checkbox"
                            id={`comorbidities.${key}`}
                            name={`comorbidities.${key}`}
                            checked={formData.comorbidities[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {formData.comorbidities.diabetes && (
                    <>
                        <label htmlFor="labs.fastingBloodSugar">Fasting Blood Sugar:</label>
                        <input
                            type="number"
                            id="labs.fastingBloodSugar"
                            name="labs.fastingBloodSugar"
                            value={formData.labs.fastingBloodSugar}
                            onChange={handleChange}
                        />
                        <label htmlFor="labs.randomBloodSugar">Random Blood Sugar:</label>
                        <input
                            type="number"
                            id="labs.randomBloodSugar"
                            name="labs.randomBloodSugar"
                            value={formData.labs.randomBloodSugar}
                            onChange={handleChange}
                        />
                    </>
                )}
                <label htmlFor="medications">Current Medications:</label>
                <textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows="3"
                ></textarea>
                <h3>Vital Signs:</h3>
                <label htmlFor="vitals.systolicBP">Systolic Blood Pressure:</label>
                <input
                    type="number"
                    id="vitals.systolicBP"
                    name="vitals.systolicBP"
                    value={formData.vitals.systolicBP}
                    onChange={handleChange}
                />
                <label htmlFor="vitals.diastolicBP">Diastolic Blood Pressure:</label>
                <input
                    type="number"
                    id="vitals.diastolicBP"
                    name="vitals.diastolicBP"
                    value={formData.vitals.diastolicBP}
                    onChange={handleChange}
                />
                <label htmlFor="vitals.pulse">Pulse:</label>
                <input
                    type="number"
                    id="vitals.pulse"
                    name="vitals.pulse"
                    value={formData.vitals.pulse}
                    onChange={handleChange}
                />
                <label htmlFor="vitals.rr">Respiratory Rate:</label>
                <input
                    type="number"
                    id="vitals.rr"
                    name="vitals.rr"
                    value={formData.vitals.rr}
                    onChange={handleChange}
                />
                <label htmlFor="vitals.temp">Temperature (°C):</label>
                <input
                    type="number"
                    id="vitals.temp"
                    name="vitals.temp"
                    value={formData.vitals.temp}
                    onChange={handleChange}
                />
                <label htmlFor="vitals.spo2">SpO₂ (%):</label>
                <input
                    type="number"
                    id="vitals.spo2"
                    name="vitals.spo2"
                    value={formData.vitals.spo2}
                    onChange={handleChange}
                />
                <h3>Lab Results:</h3>
                <label htmlFor="labs.hb">Hemoglobin (Hb):</label>
                <input
                    type="number"
                    id="labs.hb"
                    name="labs.hb"
                    value={formData.labs.hb}
                    onChange={handleChange}
                />
                <label htmlFor="labs.wbc">White Blood Cell Count (WBC):</label>
                <input
                    type="number"
                    id="labs.wbc"
                    name="labs.wbc"
                    value={formData.labs.wbc}
                    onChange={handleChange}
                />
                <label htmlFor="labs.platelets">Platelets:</label>
                <input
                    type="number"
                    id="labs.platelets"
                    name="labs.platelets"
                    value={formData.labs.platelets}
                    onChange={handleChange}
                />
                <label htmlFor="labs.sodium">Sodium (Na⁺):</label>
                <input
                    type="number"
                    id="labs.sodium"
                    name="labs.sodium"
                    value={formData.labs.sodium}
                    onChange={handleChange}
                />
                <label htmlFor="labs.potassium">Potassium (K⁺):</label>
                <input
                    type="number"
                    id="labs.potassium"
                    name="labs.potassium"
                    value={formData.labs.potassium}
                    onChange={handleChange}
                />
                <label htmlFor="labs.creatinine">Creatinine:</label>
                <input
                    type="number"
                    id="labs.creatinine"
                    name="labs.creatinine"
                    value={formData.labs.creatinine}
                    onChange={handleChange}
                />
                <label htmlFor="labs.ast">AST:</label>
                <input
                    type="number"
                    id="labs.ast"
                    name="labs.ast"
                    value={formData.labs.ast}
                    onChange={handleChange}
                />
                <label htmlFor="labs.alt">ALT:</label>
                <input
                    type="number"
                    id="labs.alt"
                    name="labs.alt"
                    value={formData.labs.alt}
                    onChange={handleChange}
                />
                <label htmlFor="labs.inr">INR:</label>
                <input
                    type="number"
                    id="labs.inr"
                    name="labs.inr"
                    value={formData.labs.inr}
                    onChange={handleChange}
                />
                <label htmlFor="labs.glucose">Blood Glucose:</label>
                <input
                    type="number"
                    id="labs.glucose"
                    name="labs.glucose"
                    value={formData.labs.glucose}
                    onChange={handleChange}
                />
                <h3>GFR and Recommendations:</h3>
                <p><strong>GFR:</strong> {formData.gfr || 'Not calculated yet'}</p>
                <p><strong>Recommendation:</strong> {formData.drugAdjustmentRecommendation || 'N/A'}</p>
                <button type="submit">Evaluate</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            {readinessScore !== null && (
                <div className="evaluation-result">
                    <h3>Preoperative Readiness Score: {readinessScore}/100</h3>
                    <p>Status: {readinessStatus}</p>
                    {readinessStatus === 'NOT FULLY READY' && (
                        <p>Flagged items require optimization before surgery.</p>
                    )}
                    {readinessStatus === 'NOT READY' && (
                        <p>Patient is not ready for surgery. Generate recommendations.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PreOpEvaluation;
