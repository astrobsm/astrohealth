import React, { useState } from 'react';

function PressureSoreRiskAssessment({ goBack }) {
    const [formData, setFormData] = useState({
        sensoryPerception: '',
        moisture: '',
        activityLevel: '',
        mobility: '',
        nutrition: '',
        frictionShear: '',
        clinicalEnhancers: '',
        ulcers: [], // Array to store multiple ulcers
    });

    const [riskScore, setRiskScore] = useState(null);
    const [riskLevel, setRiskLevel] = useState('');
    const [actionPlan, setActionPlan] = useState([]);

    const commonUlcerLocations = [
        { label: 'Supine Position', options: ['Occiput', 'Scapulae', 'Spinous processes', 'Sacrum', 'Coccyx', 'Elbows (Olecranon)', 'Heels (Calcaneus)', 'Ischial tuberosities', 'Posterior iliac crest', 'Back of the knees (Popliteal region)'] },
        { label: 'Lateral Position', options: ['Ear (Pinna)', 'Lateral acromion process', 'Ribs', 'Greater trochanter of femur', 'Lateral condyles of the knee', 'Lateral malleolus', 'Medial malleolus'] },
        { label: 'Prone Position', options: ['Forehead', 'Cheekbones (zygomatic arches)', 'Chin', 'Breasts (in females)', 'Genitalia (in males)', 'Patellae (knees)', 'Anterior iliac spines', 'Toes'] },
        { label: 'Seated Position', options: ['Ischial tuberosities', 'Sacrum and coccyx', 'Scapulae', 'Spinous processes', 'Heels and feet', 'Elbows and forearms', 'Popliteal fossa'] },
        { label: 'Others', options: ['Nasal bridge', 'Back of ears', 'Occiput/ears in neonates', 'Under splints, casts, or braces', 'Beneath medical devices'] },
    ];

    const handleChange = (e, ulcerIndex, field) => {
        const { name, type, checked, value } = e.target;
        if (ulcerIndex !== undefined) {
            const updatedUlcers = [...formData.ulcers];
            updatedUlcers[ulcerIndex] = {
                ...updatedUlcers[ulcerIndex],
                [field || name]: type === 'checkbox' ? checked : value,
            };
            setFormData({ ...formData, ulcers: updatedUlcers });
        } else {
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        }
    };

    const addUlcer = () => {
        setFormData({
            ...formData,
            ulcers: [
                ...formData.ulcers,
                {
                    location: '',
                    intactSkin: false,
                    nonBlanchableErythema: false,
                    partialThicknessLoss: false,
                    fullThicknessLoss: false,
                    exposedBoneOrTendon: false,
                    sloughOrEschar: false,
                    deepDiscoloration: false,
                    tunneling: false,
                    stage: '',
                    actionPlan: '',
                },
            ],
        });
    };

    const determineUlcerStages = () => {
        const updatedUlcers = formData.ulcers.map((ulcer) => {
            let stage = '';
            let actionPlan = '';

            if (ulcer.intactSkin && ulcer.nonBlanchableErythema) {
                stage = 'Stage 1';
                actionPlan = 'Offloading, barrier cream, moisture management, repositioning q2h';
            } else if (ulcer.partialThicknessLoss && !ulcer.sloughOrEschar) {
                stage = 'Stage 2';
                actionPlan = 'Moist dressings (hydrocolloid/hydrogel), wound cleaning, pressure relief';
            } else if (ulcer.fullThicknessLoss && !ulcer.exposedBoneOrTendon) {
                stage = 'Stage 3';
                actionPlan = 'Debridement (if needed), foam dressing, infection control, nutritional support';
            } else if (ulcer.fullThicknessLoss && ulcer.exposedBoneOrTendon) {
                stage = 'Stage 4';
                actionPlan = 'Surgical consult for debridement/flap, wound VAC, antibiotics if infected';
            } else if (ulcer.sloughOrEschar) {
                stage = 'Unstageable';
                actionPlan = 'Debride to expose wound bed, manage per surgical/wound team guidance';
            } else if (ulcer.deepDiscoloration) {
                stage = 'Deep Tissue Pressure Injury (DTPI)';
                actionPlan = 'Offload immediately, monitor closely, avoid unnecessary moisture/friction';
            } else {
                stage = 'No specific stage determined';
                actionPlan = 'No specific action plan available for this stage.';
            }

            return { ...ulcer, stage, actionPlan };
        });

        setFormData({ ...formData, ulcers: updatedUlcers });
    };

    const calculateRisk = () => {
        const scores = Object.values(formData).slice(0, 7).map((value) => parseInt(value, 10) || 0);
        const totalScore = scores.reduce((sum, score) => sum + score, 0);

        let level = '';
        let plan = [];

        if (totalScore >= 20) {
            level = 'No Risk';
            plan = [
                'Routine care and daily skin inspection',
                'Encourage mobility and hydration',
                'Maintain nutritional intake',
                'Educate patient and caregivers',
            ];
        } else if (totalScore >= 16) {
            level = 'Mild Risk';
            plan = [
                'Reposition every 2 hours if immobile',
                'Use pressure-relieving mattress overlay',
                'Moisture management: change linens, apply barrier cream',
                'Ensure adequate protein and fluid intake',
                'Begin skin protection protocol for bony prominences',
            ];
        } else if (totalScore >= 13) {
            level = 'Moderate Risk';
            plan = [
                'Use high-specification foam mattress or alternating pressure mattress',
                'Strict 2-hourly turning schedule with log sheet',
                'Daily nutritional assessment (check albumin, prealbumin)',
                'Minimize shear: Use trapeze or slide sheets',
                'Provide heel suspension boots if lower limb pressure noted',
                'Involve dietician if intake poor or catabolic state present',
            ];
        } else if (totalScore >= 10) {
            level = 'High Risk';
            plan = [
                'Transfer to air-fluidized or alternating pressure support surface',
                'Reposition every 1–2 hours strictly; document each turn',
                'Use protective dressings on high-risk areas (sacrum, heels, elbows)',
                'Start nutritional supplementation (high-protein, zinc, vitamin C)',
                'Monitor fluid balance and skin turgor daily',
                'Educate caregivers on pressure offloading',
            ];
        } else {
            level = 'Very High Risk';
            plan = [
                'Patient requires intensive pressure injury prevention program',
                'Apply wound prevention dressings proactively',
                'Monitor for early signs of tissue ischemia (purple skin, induration)',
                'Daily rounds by wound care specialist or plastic surgery team',
                'May require nutritional support via enteral/parenteral feeding',
                'Document goals of care and risk of skin breakdown in patient chart',
            ];
        }

        setRiskScore(totalScore);
        setRiskLevel(level);
        setActionPlan(plan);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateRisk();
        determineUlcerStages();
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Pressure Sore Risk Assessment</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="sensoryPerception">Sensory Perception:</label>
                <select
                    id="sensoryPerception"
                    name="sensoryPerception"
                    value={formData.sensoryPerception}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Completely limited</option>
                    <option value="2">Very limited</option>
                    <option value="3">Slightly limited</option>
                    <option value="4">No impairment</option>
                </select>
                <label htmlFor="moisture">Moisture:</label>
                <select
                    id="moisture"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Constantly moist</option>
                    <option value="2">Very moist</option>
                    <option value="3">Occasionally moist</option>
                    <option value="4">Rarely moist</option>
                </select>
                <label htmlFor="activityLevel">Activity Level:</label>
                <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Bedfast</option>
                    <option value="2">Chairfast</option>
                    <option value="3">Walks occasionally</option>
                    <option value="4">Walks frequently</option>
                </select>
                <label htmlFor="mobility">Mobility:</label>
                <select
                    id="mobility"
                    name="mobility"
                    value={formData.mobility}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Completely immobile</option>
                    <option value="2">Very limited</option>
                    <option value="3">Slightly limited</option>
                    <option value="4">No limitations</option>
                </select>
                <label htmlFor="nutrition">Nutrition:</label>
                <select
                    id="nutrition"
                    name="nutrition"
                    value={formData.nutrition}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Very poor</option>
                    <option value="2">Probably inadequate</option>
                    <option value="3">Adequate</option>
                    <option value="4">Excellent</option>
                </select>
                <label htmlFor="frictionShear">Friction and Shear:</label>
                <select
                    id="frictionShear"
                    name="frictionShear"
                    value={formData.frictionShear}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="1">Problem</option>
                    <option value="2">Potential problem</option>
                    <option value="3">No apparent problem</option>
                </select>
                <label htmlFor="clinicalEnhancers">Additional Clinical Risk Enhancers:</label>
                <select
                    id="clinicalEnhancers"
                    name="clinicalEnhancers"
                    value={formData.clinicalEnhancers}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="0">None</option>
                    <option value="1">One comorbidity</option>
                    <option value="2">Two comorbidities or controlled organ failure</option>
                    <option value="3">Uncontrolled diabetes, CHF, CKD, infection, sepsis</option>
                </select>
                <h3>Ulcers</h3>
                {formData.ulcers.map((ulcer, index) => (
                    <div key={index} className="ulcer-section">
                        <h4>Ulcer {index + 1}</h4>
                        <label htmlFor={`ulcer-location-${index}`}>Location:</label>
                        <select
                            id={`ulcer-location-${index}`}
                            name="location"
                            value={ulcer.location}
                            onChange={(e) => handleChange(e, index, 'location')}
                            required
                        >
                            <option value="">Select location</option>
                            {commonUlcerLocations.map((group, groupIndex) => (
                                <optgroup key={groupIndex} label={group.label}>
                                    {group.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {[
                            { label: 'Intact skin', name: 'intactSkin' },
                            { label: 'Non-blanchable erythema', name: 'nonBlanchableErythema' },
                            { label: 'Partial-thickness skin loss', name: 'partialThicknessLoss' },
                            { label: 'Full-thickness skin loss', name: 'fullThicknessLoss' },
                            { label: 'Exposed bone or tendon', name: 'exposedBoneOrTendon' },
                            { label: 'Slough or eschar present', name: 'sloughOrEschar' },
                            { label: 'Deep discoloration', name: 'deepDiscoloration' },
                            { label: 'Tunneling or undermining', name: 'tunneling' },
                        ].map((feature, featureIndex) => (
                            <div key={featureIndex}>
                                <label htmlFor={`ulcer-${feature.name}-${index}`}>
                                    <input
                                        type="checkbox"
                                        id={`ulcer-${feature.name}-${index}`}
                                        name={feature.name}
                                        checked={ulcer[feature.name]}
                                        onChange={(e) => handleChange(e, index, feature.name)}
                                    />
                                    {feature.label}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="button" onClick={addUlcer}>
                    Add Ulcer
                </button>
                <button type="submit">Assess Risk</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            {riskScore !== null && (
                <div className="evaluation-result">
                    <h3>Total Score: {riskScore}/26</h3>
                    <p><strong>Risk Level:</strong> {riskLevel}</p>
                    <h4>Recommended Action Plan:</h4>
                    <ul>
                        {actionPlan.map((action, index) => (
                            <li key={index}>{action}</li>
                        ))}
                    </ul>
                </div>
            )}
            {formData.ulcers.map((ulcer, index) => (
                <div key={index} className="sore-action-plan">
                    <h3>Ulcer {index + 1} ({ulcer.location})</h3>
                    <p><strong>Stage:</strong> {ulcer.stage}</p>
                    <p><strong>Action Plan:</strong> {ulcer.actionPlan}</p>
                </div>
            ))}
        </div>
    );
}

export default PressureSoreRiskAssessment;
