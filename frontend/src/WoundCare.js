import React, { useState } from 'react';
import ExtensionPhaseDressing from './ExtensionPhaseDressing'; // Import the Extension Phase component
import TransitionPhaseDressing from './TransitionPhaseDressing'; // Import the Transition Phase component
import RepairPhaseDressing from './RepairPhaseDressing'; // Import the Repair Phase component
import IndolentPhaseDressing from './IndolentPhaseDressing'; // Import the Indolent Phase component

function WoundCare({ goBack }) {
    const [formData, setFormData] = useState({
        woundBed: '',
        exudate: '',
        woundEdge: '',
        infection: '',
        pain: '',
        healingProgress: '',
    });

    const [showExtensionPhaseDressing, setShowExtensionPhaseDressing] = useState(false); // State for Extension Phase
    const [showTransitionPhaseDressing, setShowTransitionPhaseDressing] = useState(false); // State for Transition Phase
    const [showRepairPhaseDressing, setShowRepairPhaseDressing] = useState(false); // State for Repair Phase
    const [showIndolentPhaseDressing, setShowIndolentPhaseDressing] = useState(false); // State for Indolent Phase

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateScore = () => {
        const scores = Object.values(formData).map((value) => parseInt(value, 10) || 0);
        return scores.reduce((total, score) => total + score, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalScore = calculateScore();
        let phase = '';

        if (totalScore >= 15) {
            phase = 'Extension Phase';
        } else if (totalScore >= 10) {
            phase = 'Transition Phase';
        } else if (totalScore >= 5) {
            phase = 'Repair Phase';
        } else {
            phase = 'Indolent Phase';
        }

        alert(`Total Score: ${totalScore}\nPhase Classification: ${phase}`);
    };

    if (showExtensionPhaseDressing) {
        return <ExtensionPhaseDressing goBack={() => setShowExtensionPhaseDressing(false)} />;
    }

    if (showTransitionPhaseDressing) {
        return <TransitionPhaseDressing goBack={() => setShowTransitionPhaseDressing(false)} />;
    }

    if (showRepairPhaseDressing) {
        return <RepairPhaseDressing goBack={() => setShowRepairPhaseDressing(false)} />;
    }

    if (showIndolentPhaseDressing) {
        return <IndolentPhaseDressing goBack={() => setShowIndolentPhaseDressing(false)} />;
    }

    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Wound-Care Protocol</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="woundBed">Wound Bed Tissue Composition:</label>
                <select
                    id="woundBed"
                    name="woundBed"
                    value={formData.woundBed}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Necrotic/Slough >75%</option>
                    <option value="2">Slough 25–75%</option>
                    <option value="1">{'<25% Slough, granulation present'}</option>
                    <option value="0">100% granulation tissue</option>
                </select>
                <label htmlFor="exudate">Exudate Amount:</label>
                <select
                    id="exudate"
                    name="exudate"
                    value={formData.exudate}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Profuse, malodorous</option>
                    <option value="2">Moderate, cloudy</option>
                    <option value="1">Minimal, clear or serosanguinous</option>
                    <option value="0">Dry or balanced moisture</option>
                </select>
                <label htmlFor="woundEdge">Wound Edge Condition:</label>
                <select
                    id="woundEdge"
                    name="woundEdge"
                    value={formData.woundEdge}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Undermined, rolled, fibrotic</option>
                    <option value="2">Irregular, macerated</option>
                    <option value="1">Advancing edge with epithelial islands</option>
                    <option value="0">Contracting, healthy margin</option>
                </select>
                <label htmlFor="infection">Signs of Infection/Inflammation:</label>
                <select
                    id="infection"
                    name="infection"
                    value={formData.infection}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Spreading cellulitis, systemic signs</option>
                    <option value="2">Local signs with pain/heat</option>
                    <option value="1">No infection, mild inflammation</option>
                    <option value="0">No signs, resolving state</option>
                </select>
                <label htmlFor="pain">Pain (Patient Reported):</label>
                <select
                    id="pain"
                    name="pain"
                    value={formData.pain}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Severe, persistent, at rest</option>
                    <option value="2">Moderate, during movement</option>
                    <option value="1">Mild, only on dressing change</option>
                    <option value="0">No pain</option>
                </select>
                <label htmlFor="healingProgress">Healing Progress (Past 2 Weeks):</label>
                <select
                    id="healingProgress"
                    name="healingProgress"
                    value={formData.healingProgress}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="3">Increase in size, depth, necrosis</option>
                    <option value="2">Stagnant, no improvement</option>
                    <option value="1">Some reduction in size/depth</option>
                    <option value="0">Clear reduction, visible repair</option>
                </select>
                <button type="submit">Calculate Score</button>
                <button type="button" className="back-button" onClick={goBack}>
                    Back
                </button>
            </form>
            <div className="phase-buttons">
                <button
                    className="phase-button"
                    onClick={() => setShowExtensionPhaseDressing(true)}
                >
                    Extension
                </button>
                <button
                    className="phase-button"
                    onClick={() => setShowTransitionPhaseDressing(true)}
                >
                    Transition
                </button>
                <button
                    className="phase-button"
                    onClick={() => setShowRepairPhaseDressing(true)}
                >
                    Repair
                </button>
                <button
                    className="phase-button"
                    onClick={() => setShowIndolentPhaseDressing(true)}
                >
                    Indolent
                </button>
            </div>
        </div>
    );
}

export default WoundCare;
