import React, { useState } from 'react';

function DVTRiskAssessment({ goBack, patients = [] }) { // Default patients to an empty array
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bmi: '',
        immobility: false,
        surgeryDuration: false,
        trauma: false,
        historyOfDVT: false,
        thrombophilia: false,
        malignancy: false,
        chemotherapy: false,
        pregnancy: false,
        estrogenTherapy: false,
        varicoseVeins: false,
        centralVenousCatheter: false,
        heartFailure: false,
        acuteMI: false,
        sepsis: false,
        inflammatoryDisease: false,
        longTravel: false,
        nephroticSyndrome: false,
        limbImmobilization: false,
    });

    const [totalScore, setTotalScore] = useState(null);
    const [recommendation, setRecommendation] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

        if (name === 'name') {
            const filteredSuggestions = patients
                .filter((patient) =>
                    patient.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((patient) => patient.name);
            setSuggestions(filteredSuggestions);
        }
    };

    const handleSuggestionClick = (name) => {
        setFormData({ ...formData, name });
        setSuggestions([]);
    };

    const calculateScore = () => {
        let score = 0;

        // Scoring logic
        if (formData.age === '41-60') score += 1;
        if (formData.age === '61-74') score += 2;
        if (formData.age === '75+') score += 3;
        if (formData.bmi > 30) score += 1;
        if (formData.immobility) score += 2;
        if (formData.surgeryDuration) score += 2;
        if (formData.trauma) score += 5;
        if (formData.historyOfDVT) score += 3;
        if (formData.thrombophilia) score += 3;
        if (formData.malignancy) score += 3;
        if (formData.chemotherapy) score += 2;
        if (formData.pregnancy) score += 2;
        if (formData.estrogenTherapy) score += 1;
        if (formData.varicoseVeins) score += 1;
        if (formData.centralVenousCatheter) score += 2;
        if (formData.heartFailure) score += 1;
        if (formData.acuteMI) score += 1;
        if (formData.sepsis) score += 1;
        if (formData.inflammatoryDisease) score += 1;
        if (formData.longTravel) score += 1;
        if (formData.nephroticSyndrome) score += 1;
        if (formData.limbImmobilization) score += 2;

        setTotalScore(score);

        // Recommendations based on score
        if (score <= 1) {
            setRecommendation('Low Risk: Early ambulation, hydration, and patient education. No pharmacologic therapy needed.');
        } else if (score <= 4) {
            setRecommendation('Moderate Risk: Consider low-dose LMWH or UFH, or mechanical prophylaxis (e.g., GCS or IPC). Duration: 7–10 days or until mobile.');
        } else if (score <= 8) {
            setRecommendation('High Risk: LMWH (Enoxaparin 40 mg SC daily) or UFH 5000 IU SC every 8 hours. Consider IPC devices. Duration: 4–6 weeks for orthopedic surgery.');
        } else {
            setRecommendation('Very High Risk: Full anticoagulant prophylaxis (e.g., LMWH 40 mg SC daily). Combine mechanical and pharmacological prophylaxis. Monitor closely for bleeding risks.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateScore();
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>DVT Risk Assessment</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Patient Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter patient's name"
                    required
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <label htmlFor="age">Age:</label>
                <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select age range</option>
                    <option value="41-60">41–60 years</option>
                    <option value="61-74">61–74 years</option>
                    <option value="75+">75+ years</option>
                </select>
                <label htmlFor="bmi">BMI:</label>
                <input
                    type="number"
                    id="bmi"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleChange}
                    placeholder="Enter BMI"
                />
                <label>
                    <input
                        type="checkbox"
                        name="immobility"
                        checked={formData.immobility}
                        onChange={handleChange}
                    />
                    Immobility ≥72 hours
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="surgeryDuration"
                        checked={formData.surgeryDuration}
                        onChange={handleChange}
                    />
                    Surgery >45 minutes
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="trauma"
                        checked={formData.trauma}
                        onChange={handleChange}
                    />
                    Major trauma or fractures
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="historyOfDVT"
                        checked={formData.historyOfDVT}
                        onChange={handleChange}
                    />
                    History of DVT/PE
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="thrombophilia"
                        checked={formData.thrombophilia}
                        onChange={handleChange}
                    />
                    Known thrombophilia
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="malignancy"
                        checked={formData.malignancy}
                        onChange={handleChange}
                    />
                    Active malignancy
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="chemotherapy"
                        checked={formData.chemotherapy}
                        onChange={handleChange}
                    />
                    Ongoing chemotherapy
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="pregnancy"
                        checked={formData.pregnancy}
                        onChange={handleChange}
                    />
                    Pregnancy or postpartum (&lt;6 weeks)
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="estrogenTherapy"
                        checked={formData.estrogenTherapy}
                        onChange={handleChange}
                    />
                    Estrogen therapy / contraceptive pills
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="varicoseVeins"
                        checked={formData.varicoseVeins}
                        onChange={handleChange}
                    />
                    Varicose veins
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="centralVenousCatheter"
                        checked={formData.centralVenousCatheter}
                        onChange={handleChange}
                    />
                    Central venous catheter / PICC
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="heartFailure"
                        checked={formData.heartFailure}
                        onChange={handleChange}
                    />
                    Congestive heart failure
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="acuteMI"
                        checked={formData.acuteMI}
                        onChange={handleChange}
                    />
                    Acute MI or Stroke
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="sepsis"
                        checked={formData.sepsis}
                        onChange={handleChange}
                    />
                    Sepsis or critical illness
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="inflammatoryDisease"
                        checked={formData.inflammatoryDisease}
                        onChange={handleChange}
                    />
                    Inflammatory diseases (SLE, IBD, RA)
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="longTravel"
                        checked={formData.longTravel}
                        onChange={handleChange}
                    />
                    Recent long-distance travel (>6 hrs)
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="nephroticSyndrome"
                        checked={formData.nephroticSyndrome}
                        onChange={handleChange}
                    />
                    Nephrotic syndrome
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="limbImmobilization"
                        checked={formData.limbImmobilization}
                        onChange={handleChange}
                    />
                    Lower limb cast or immobilization
                </label>
                <button type="submit">Calculate Risk</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            {totalScore !== null && (
                <div className="evaluation-result">
                    <h3>Total Score: {totalScore}/30</h3>
                    <p><strong>Recommendation:</strong> {recommendation}</p>
                </div>
            )}
        </div>
    );
}

export default DVTRiskAssessment;
