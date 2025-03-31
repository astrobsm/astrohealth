import React, { useState } from 'react';
import jsPDF from 'jspdf';

function DietaryPlans({ goBack }) {
    const [patientData, setPatientData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        comorbidities: {
            hypertension: false,
            heartFailure: false,
            burns: false,
            renalFailure: false,
            liverImpairment: false,
            malignancy: false,
            tuberculosis: false,
            neurofibromatosis: false,
            diabetes: false,
        },
        woundStatus: {
            present: false,
            surfaceArea: '',
            infection: false,
        },
        burnsSurfaceArea: '', // Field for burns surface area
        renalImpairment: {
            creatinine: '',
            creatinineUnit: 'mg/dL', // Default unit
            gender: '',
        },
    });

    const [dietaryPlan, setDietaryPlan] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('comorbidities.')) {
            const field = name.split('.')[1];
            setPatientData({
                ...patientData,
                comorbidities: { ...patientData.comorbidities, [field]: type === 'checkbox' ? checked : value },
            });
        } else if (name.startsWith('renalImpairment.')) {
            const field = name.split('.')[1];
            setPatientData({
                ...patientData,
                renalImpairment: { ...patientData.renalImpairment, [field]: value },
            });
        } else if (name.startsWith('woundStatus.')) {
            const field = name.split('.')[1];
            setPatientData({
                ...patientData,
                woundStatus: { ...patientData.woundStatus, [field]: type === 'checkbox' ? checked : value },
            });
        } else {
            setPatientData({ ...patientData, [name]: value });
        }
    };

    const calculateBurnsCalories = () => {
        const { weight, burnsSurfaceArea, age } = patientData;
        if (!weight || !burnsSurfaceArea) return null;

        const weightKg = parseFloat(weight);
        const tbsa = parseFloat(burnsSurfaceArea);

        if (age > 15) {
            // Curreri formula for adults
            return (25 * weightKg) + (40 * tbsa);
        } else {
            // Curreri formula for pediatrics
            return (60 * weightKg) + (35 * tbsa);
        }
    };

    const calculateGFR = () => {
        const { creatinine, creatinineUnit, gender, age } = patientData.renalImpairment;
        if (!creatinine || !gender || !age) return null;

        const creatinineValue = creatinineUnit === 'µmol/L' ? parseFloat(creatinine) / 88.4 : parseFloat(creatinine);
        const kappa = gender === 'male' ? 0.9 : 0.7;
        const alpha = gender === 'male' ? -0.411 : -0.329;
        const minScr = Math.min(creatinineValue / kappa, 1);
        const maxScr = Math.max(creatinineValue / kappa, 1);

        // CKD-EPI Equation
        return (
            141 *
            Math.pow(minScr, alpha) *
            Math.pow(maxScr, -1.209) *
            Math.pow(0.993, parseInt(age, 10)) *
            (gender === 'female' ? 1.018 : 1)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const burnsCalories = patientData.comorbidities.burns ? calculateBurnsCalories() : null;
        const gfr = patientData.comorbidities.renalFailure ? calculateGFR() : null;

        // Generate a mock dietary plan for demonstration
        const plan = {
            energy: burnsCalories ? `${burnsCalories.toFixed(2)} kcal/day` : '2000 kcal/day',
            protein: '75 g/day',
            carbs: '250 g/day',
            fats: '70 g/day',
            fluids: '2500 mL/day',
            micronutrients: {
                vitaminC: '90 mg/day',
                vitaminA: '700 µg/day',
                zinc: '11 mg/day',
                iron: '18 mg/day',
            },
            gfr: gfr ? `${gfr.toFixed(2)} mL/min/1.73 m²` : null,
            foodRecommendations: [
                { food: 'Yam', quantity: '200 g', nutrients: 'Carbs, Vitamin C' },
                { food: 'Beans', quantity: '150 g', nutrients: 'Protein, Iron' },
                { food: 'Fish', quantity: '100 g', nutrients: 'Protein, Omega-3' },
                { food: 'Ugu', quantity: '100 g', nutrients: 'Vitamin A, Zinc' },
            ],
        };
        setDietaryPlan(plan);
        alert('Dietary plan generated successfully!');
    };

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Dietary Plans</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    aria-label="Enter full name"
                    required
                />
                <label htmlFor="age">Age (years):</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={patientData.age}
                    onChange={handleChange}
                    aria-label="Enter age in years"
                    required
                />
                <label htmlFor="height">Height (cm):</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={patientData.height}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={patientData.weight}
                    onChange={handleChange}
                    required
                />
                <h3>Comorbidities:</h3>
                {Object.keys(patientData.comorbidities).map((key) => (
                    <div key={key}>
                        <label htmlFor={`comorbidities.${key}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="checkbox"
                            id={`comorbidities.${key}`}
                            name={`comorbidities.${key}`}
                            checked={patientData.comorbidities[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                {patientData.comorbidities.burns && (
                    <>
                        <label htmlFor="burnsSurfaceArea">Burns Surface Area (%):</label>
                        <input
                            type="number"
                            id="burnsSurfaceArea"
                            name="burnsSurfaceArea"
                            value={patientData.burnsSurfaceArea}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {patientData.comorbidities.renalFailure && (
                    <>
                        <label htmlFor="renalImpairment.creatinine">Serum Creatinine:</label>
                        <input
                            type="number"
                            id="renalImpairment.creatinine"
                            name="renalImpairment.creatinine"
                            value={patientData.renalImpairment.creatinine}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="renalImpairment.creatinineUnit">Creatinine Unit:</label>
                        <select
                            id="renalImpairment.creatinineUnit"
                            name="renalImpairment.creatinineUnit"
                            value={patientData.renalImpairment.creatinineUnit}
                            onChange={handleChange}
                        >
                            <option value="mg/dL">mg/dL</option>
                            <option value="µmol/L">µmol/L</option>
                        </select>
                        <label htmlFor="renalImpairment.gender">Gender:</label>
                        <select
                            id="renalImpairment.gender"
                            name="renalImpairment.gender"
                            value={patientData.renalImpairment.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </>
                )}
                <button type="submit">Generate Plan</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            {dietaryPlan && (
                <div className="dietary-plan-output">
                    <h3>Generated Dietary Plan</h3>
                    <p><strong>Energy:</strong> {dietaryPlan.energy}</p>
                    <p><strong>Protein:</strong> {dietaryPlan.protein}</p>
                    <p><strong>Carbohydrates:</strong> {dietaryPlan.carbs}</p>
                    <p><strong>Fats:</strong> {dietaryPlan.fats}</p>
                    <p><strong>Fluids:</strong> {dietaryPlan.fluids}</p>
                    {dietaryPlan.gfr && <p><strong>eGFR:</strong> {dietaryPlan.gfr}</p>}
                    <h4>Micronutrients:</h4>
                    <ul>
                        {Object.entries(dietaryPlan.micronutrients).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                        ))}
                    </ul>
                    <h4>Food Recommendations:</h4>
                    <ul>
                        {dietaryPlan.foodRecommendations.map((item, index) => (
                            <li key={index}>{item.food}: {item.quantity} ({item.nutrients})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DietaryPlans;
