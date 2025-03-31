import React, { useState } from 'react';

function DiabeticFootCare({ goBack }) {
    const [localWoundScore, setLocalWoundScore] = useState({
        ulcerDepth: '',
        ulcerArea: '',
        infection: '',
        ischemia: '',
        neuropathy: '',
        duration: '',
        woundEdge: '',
    });

    const [systemicRiskFactors, setSystemicRiskFactors] = useState({
        age: '',
        comorbidities: '',
        systemicInfection: '',
    });

    const handleLocalChange = (e) => {
        const { name, value } = e.target;
        setLocalWoundScore({ ...localWoundScore, [name]: value });
    };

    const handleSystemicChange = (e) => {
        const { name, value } = e.target;
        setSystemicRiskFactors({ ...systemicRiskFactors, [name]: value });
    };

    const calculateTotalScore = () => {
        const localScore = Object.values(localWoundScore).reduce(
            (total, value) => total + (parseInt(value, 10) || 0),
            0
        );
        const systemicScore = Object.values(systemicRiskFactors).reduce(
            (total, value) => total + (parseInt(value, 10) || 0),
            0
        );
        return localScore + systemicScore;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalScore = calculateTotalScore();
        let recommendation = '';

        if (totalScore <= 10) {
            recommendation =
                'High chance of healing with standard therapy. Limb salvageable.';
        } else if (totalScore <= 17) {
            recommendation =
                'Requires aggressive salvage approach. Consider revascularization.';
        } else if (totalScore <= 23) {
            recommendation =
                'Limited salvage options. Evaluate perfusion, comorbid control.';
        } else {
            recommendation =
                'High risk of failure. Amputation likely unless reversible pathology.';
        }

        alert(`Total Score: ${totalScore}\nRecommendation: ${recommendation}`);
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Diabetic Foot Care</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <h3>Part A – Local Wound Score</h3>
                <label htmlFor="ulcerDepth">Ulcer Depth:</label>
                <select
                    id="ulcerDepth"
                    name="ulcerDepth"
                    value={localWoundScore.ulcerDepth}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Exposed bone, joint, or tendon</option>
                    <option value="2">Involves subcutaneous tissue</option>
                    <option value="1">Limited to dermis</option>
                    <option value="0">Superficial or epithelializing</option>
                </select>
                <label htmlFor="ulcerArea">Ulcer Area (cm²):</label>
                <select
                    id="ulcerArea"
                    name="ulcerArea"
                    value={localWoundScore.ulcerArea}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">>4 cm²</option>
                    <option value="2">2–4 cm²</option>
                    <option value="1">{'<2 cm²'}</option>
                    <option value="0">{'<1 cm² or reducing'}</option>
                </select>
                <label htmlFor="infection">Infection Signs:</label>
                <select
                    id="infection"
                    name="infection"
                    value={localWoundScore.infection}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Systemic infection (fever, sepsis)</option>
                    <option value="2">Local infection with drainage</option>
                    <option value="1">Mild redness, no drainage</option>
                    <option value="0">No infection</option>
                </select>
                <label htmlFor="ischemia">Ischemia / Perfusion:</label>
                <select
                    id="ischemia"
                    name="ischemia"
                    value={localWoundScore.ischemia}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Absent pulses, ABI {'<0.4'}</option>
                    <option value="2">Diminished pulses, ABI 0.4–0.7</option>
                    <option value="1">Palpable pulses, ABI {'>0.7'}</option>
                    <option value="0">Normal circulation</option>
                </select>
                <label htmlFor="neuropathy">Neuropathy:</label>
                <select
                    id="neuropathy"
                    name="neuropathy"
                    value={localWoundScore.neuropathy}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">No protective sensation + pain</option>
                    <option value="2">No protective sensation only</option>
                    <option value="1">Mild neuropathy</option>
                    <option value="0">Normal sensation</option>
                </select>
                <label htmlFor="duration">Wound Duration:</label>
                <select
                    id="duration"
                    name="duration"
                    value={localWoundScore.duration}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">{'>6 weeks'}</option>
                    <option value="2">3–6 weeks</option>
                    <option value="1">1–3 weeks</option>
                    <option value="0">{'<1 week'}</option>
                </select>
                <label htmlFor="woundEdge">Wound Edge & Undermining:</label>
                <select
                    id="woundEdge"
                    name="woundEdge"
                    value={localWoundScore.woundEdge}
                    onChange={handleLocalChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Undermined/rolled edge</option>
                    <option value="2">Hyperkeratotic edge</option>
                    <option value="1">Dry/scaling edge</option>
                    <option value="0">Healthy advancing edge</option>
                </select>
                <h3>Part B – Systemic Risk Factors</h3>
                <label htmlFor="age">Age:</label>
                <select
                    id="age"
                    name="age"
                    value={systemicRiskFactors.age}
                    onChange={handleSystemicChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="0">{'<60 years'}</option>
                    <option value="1">60–75 years</option>
                    <option value="2">{'>75 years'}</option>
                    <option value="3">{'>85 years or frail'}</option>
                </select>
                <label htmlFor="comorbidities">Comorbidities:</label>
                <select
                    id="comorbidities"
                    name="comorbidities"
                    value={systemicRiskFactors.comorbidities}
                    onChange={handleSystemicChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="0">None or controlled DM only</option>
                    <option value="1">Controlled comorbidities (HTN, dyslipidemia)</option>
                    <option value="2">End-organ disease (CKD, CHF, retinopathy)</option>
                    <option value="3">Multisystem failure, immunosuppressed</option>
                </select>
                <label htmlFor="systemicInfection">Systemic Infection/Sepsis:</label>
                <select
                    id="systemicInfection"
                    name="systemicInfection"
                    value={systemicRiskFactors.systemicInfection}
                    onChange={handleSystemicChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="0">No systemic signs</option>
                    <option value="1">Fever or mild SIRS criteria met</option>
                    <option value="2">Clinical sepsis (HR, RR, lactate ↑)</option>
                    <option value="3">Septic shock or MODS</option>
                </select>
                <button type="submit">Calculate Score</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default DiabeticFootCare;
