import React, { useState } from 'react';

const carePlans = {
    "Reconstructive Surgeries": {
        title: "Reconstructive Surgeries (General)",
        day1to3: [
            "Monitor vitals for hemodynamic instability or bleeding.",
            "Avoid pressure over grafts/flaps; elevate limbs if applicable.",
            "Flap monitoring every 2–4 hours (color, warmth, capillary refill, Doppler signal).",
            "Use PCA or IV opioids initially, taper by Day 3.",
            "Leave dressings intact unless saturated; maintain sterility.",
            "Continue post-op prophylactic antibiotics if needed.",
            "Provide high-protein, high-calorie diet to promote healing."
        ],
        day4to7: [
            "Begin dressing changes under aseptic technique.",
            "Encourage gradual mobilization.",
            "Monitor for flap congestion, necrosis, or graft loss.",
            "Introduce physiotherapy for functional restoration."
        ],
        general: "Emphasize nutrition, daily wound inspections and early ambulation. Document vital parameters, pain scores, and drain outputs."
    },
    "Skin Grafting": {
        title: "Skin Grafting (Split or Full-Thickness)",
        graftSite: [
            "Immobilize graft for 5–7 days.",
            "Avoid moisture and friction.",
            "First dressing change on Day 5 (unless infection appears).",
            "Monitor for hematoma, seroma, or graft slippage."
        ],
        donorSite: [
            "Keep donor site moist with paraffin or silicone gauze.",
            "Ensure effective pain management.",
            "Heals typically within 7–10 days."
        ],
        general: "Supplement with Vitamin C and Zinc. Limit mobility until graft take is confirmed."
    },
    "Diabetic Foot Ulcer Debridement / Necrotizing Fasciitis": {
        title: "Diabetic Foot Ulcer Debridement / Necrotizing Fasciitis",
        day1to3: [
            "Admit to ICU or high dependency if infection is extensive.",
            "Administer broad-spectrum IV antibiotics (culture-guided).",
            "Perform daily wound dressing changes under aseptic conditions.",
            "Maintain strict glycemic control with regular RBS monitoring and insulin adjustments.",
            "Monitor for signs of sepsis or recurrence."
        ],
        day4to7: [
            "Arrange surgical review to evaluate for further debridement or grafting.",
            "Provide nutritional support (monitor albumin/prealbumin levels).",
            "Begin offloading protocols and custom footwear planning."
        ],
        general: "Ensure thorough documentation and repeat evaluations."
    },
    "Hand Infections / Cellulitis / Abscess Drainage": {
        title: "Hand Infections / Cellulitis / Abscess Drainage",
        immediate: [
            "Elevate the affected limb to reduce edema.",
            "Immobilize with splints as needed.",
            "Consider warm soaks or physiotherapy starting after Day 3.",
            "Initiate appropriate antibiotic therapy (IV/oral).",
            "Administer tetanus toxoid if indicated."
        ],
        followUp: [
            "Conduct daily wound assessments.",
            "Remove packing/drains by Day 3–5.",
            "Start functional rehabilitation within 7–10 days."
        ],
        general: "Document wound status and adjust treatment accordingly."
    },
    "Pressure Sore Flap Coverage": {
        title: "Pressure Sore Flap Coverage",
        day1to3: [
            "Position the patient to avoid flap compression (e.g. prone for sacral flaps).",
            "Utilize a pressure-relieving mattress.",
            "Monitor the flap hourly for the first 48 hours."
        ],
        day4to7: [
            "Maintain nutritional support with protein intake >1.5 g/kg/day.",
            "Limit repositioning to preserve flap integrity.",
            "Initiate mobilization protocol after one week if stable."
        ],
        general: "Ensure meticulous care and frequent assessments."
    },
    "Abdominoplasty / Abdominal Wall Reconstruction": {
        title: "Abdominoplasty / Abdominal Wall Reconstruction",
        day1to3: [
            "Monitor vitals and drain outputs closely.",
            "Start prophylactic anticoagulation if safe.",
            "Advise avoiding straining or core activation.",
            "Manage pain with PCA or appropriate oral analgesics."
        ],
        day4to7: [
            "Encourage gentle ambulation.",
            "Remove drains when output is <30 mL/day.",
            "Advise binder use for 4–6 weeks.",
            "Monitor for seroma formation or flap necrosis."
        ],
        general: "Document fluid balance and pain scores diligently."
    },
    "Breast Reconstruction": {
        title: "Breast Reconstruction (Flap or Implant-Based)",
        first3Days: [
            "Manage drain care and monitor output.",
            "Immobilize shoulder and elevate the upper limb.",
            "Ensure adequate pain control and administer antibiotics."
        ],
        day4to7: [
            "Begin pendulum shoulder exercises.",
            "Remove drains when output is <30 mL/day.",
            "Continuously monitor flap perfusion, scar, and skin for ischemia."
        ],
        general: "Schedule follow-ups and document recovery parameters."
    },
    "Liposuction": {
        title: "Liposuction",
        immediate: [
            "Instruct the patient to wear compression garments continuously for 2–3 weeks.",
            "Encourage ambulation within 12–24 hours.",
            "Ensure adequate hydration to facilitate fat metabolism.",
            "Monitor for fluid shifts or signs of hypotension."
        ],
        followUp: [
            "Expect swelling to persist for 3–4 weeks.",
            "Advise avoiding strenuous activity for at least 2 weeks.",
            "Initiate lymphatic massage after one week if appropriate."
        ],
        general: "Document weight changes and patient comfort levels."
    },
    "Cleft Lip and Palate Repair": {
        title: "Cleft Lip and Palate Repair",
        cleftLip: [
            "Apply elbow restraints to prevent wound disruption.",
            "Advise feeding with a cup/spoon (avoid nipple feeding).",
            "Instruct on gentle wound cleaning after feeds.",
            "Schedule suture removal between Day 5–7."
        ],
        cleftPalate: [
            "Recommend soft diets; avoid hard foods and oral suction.",
            "Use IV fluids on Days 1–2, then transition to oral fluids.",
            "Plan for speech therapy post-healing and ENT review for ear infections."
        ],
        general: "Ensure parental education and documentation of feeding progress."
    },
    "Keloid Excision": {
        title: "Keloid Excision",
        day1to3: [
            "Apply a pressure dressing or silicone gel.",
            "Prepare to start post-op intralesional steroids (e.g., triamcinolone) on Day 7.",
            "Minimize tension on the suture line."
        ],
        followUp: [
            "Conduct weekly reviews for recurrence.",
            "Educate the patient on recurrence prevention strategies."
        ],
        general: "Monitor scar formation and pain levels."
    },
    "Ingrown Toenail Excision": {
        title: "Ingrown Toenail Excision",
        day1to3: [
            "Advise foot elevation.",
            "Prescribe analgesics and recommend salt soaks starting on Day 2.",
            "Administer antibiotics if infection is present."
        ],
        day4to7: [
            "Schedule dressing changes every 48 hours.",
            "Provide footwear education and proper trimming techniques.",
            "Plan for return to normal activity by Days 7–10."
        ],
        general: "Follow up for wound healing and infection status."
    }
};

// Define inline style objects for attractive design and dynamic transitions
const containerStyle = {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s ease-in-out',
    maxWidth: '900px',
    margin: '20px auto'
};

const headerStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '10px',
    transition: 'color 0.5s ease'
};

const selectStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    margin: '10px 0',
    transition: 'all 0.3s ease'
};

const detailsStyle = {
    backgroundColor: '#fff',
    borderRadius: '6px',
    padding: '15px',
    marginTop: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.4s ease'
};

const buttonStyle = {
    margin: '10px 5px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
};

const buttonHoverStyle = {
    backgroundColor: '#357ABD'
};

function PostOpCare() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [vitals, setVitals] = useState({
        painScore: '',
        bloodPressure: '',
        heartRate: ''
    });
    const [hoveredBtn, setHoveredBtn] = useState(""); // track hovered button

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleVitalsChange = (e) => {
        const { name, value } = e.target;
        setVitals({ ...vitals, [name]: value });
    };

    const handleApprove = () => {
        alert("Care plan approved. Proceed to scheduling follow-up or discharge summary.");
    };

    const handleAdjust = () => {
        alert("Adjustments required. Generating recommendations for further evaluation.");
    };

    const handlePrint = () => {
        window.print();
    };

    const selectedPlan = carePlans[selectedCategory];

    return (
        <div style={containerStyle}>
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" style={{display: 'block', margin: '0 auto'}} />
            </div>
            <h1 style={headerStyle}>Interactive Postoperative Care Console</h1>
            <p style={{textAlign: 'center', color: '#555'}}>Select a surgical procedure to view detailed postoperative care recommendations:</p>
            <select value={selectedCategory} onChange={handleCategoryChange} required style={selectStyle}>
                <option value="">-- Select Surgery Category --</option>
                {Object.keys(carePlans).map((key) => (
                    <option key={key} value={key}>{carePlans[key].title}</option>
                ))}
            </select>
            {selectedPlan && (
                <div style={detailsStyle}>
                    <h2 style={headerStyle}>{selectedPlan.title}</h2>
                    {selectedPlan.day1to3 && (
                        <>
                            <h3>Day 1–3</h3>
                            <ul>
                                {selectedPlan.day1to3.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.day4to7 && (
                        <>
                            <h3>Day 4–7</h3>
                            <ul>
                                {selectedPlan.day4to7.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.graftSite && (
                        <>
                            <h3>Graft Site</h3>
                            <ul>
                                {selectedPlan.graftSite.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.donorSite && (
                        <>
                            <h3>Donor Site</h3>
                            <ul>
                                {selectedPlan.donorSite.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.immediate && (
                        <>
                            <h3>Immediate Post-Op</h3>
                            <ul>
                                {selectedPlan.immediate.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.followUp && (
                        <>
                            <h3>Follow-Up</h3>
                            <ul>
                                {selectedPlan.followUp.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.cleftLip && (
                        <>
                            <h3>Cleft Lip</h3>
                            <ul>
                                {selectedPlan.cleftLip.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.cleftPalate && (
                        <>
                            <h3>Cleft Palate</h3>
                            <ul>
                                {selectedPlan.cleftPalate.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {selectedPlan.general && (
                        <>
                            <h3>General Postoperative Advice</h3>
                            <p>{selectedPlan.general}</p>
                        </>
                    )}
                    <h3>Document Vital Parameters</h3>
                    <div className="vitals-form">
                        <label>
                            Pain Score:
                            <input type="number" name="painScore" value={vitals.painScore} onChange={handleVitalsChange} style={selectStyle} />
                        </label>
                        <label>
                            Blood Pressure:
                            <input type="text" name="bloodPressure" value={vitals.bloodPressure} onChange={handleVitalsChange} style={selectStyle} />
                        </label>
                        <label>
                            Heart Rate:
                            <input type="number" name="heartRate" value={vitals.heartRate} onChange={handleVitalsChange} style={selectStyle} />
                        </label>
                    </div>
                    <div className="console-navigation" style={{textAlign: 'center'}}>
                        <button 
                            onClick={handleApprove} 
                            style={hoveredBtn === 'approve' ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                            onMouseEnter={() => setHoveredBtn('approve')}
                            onMouseLeave={() => setHoveredBtn("")}
                        >
                            Approve Care Plan
                        </button>
                        <button 
                            onClick={handleAdjust} 
                            style={hoveredBtn === 'adjust' ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                            onMouseEnter={() => setHoveredBtn('adjust')}
                            onMouseLeave={() => setHoveredBtn("")}
                        >
                            Adjust Plan
                        </button>
                        <button 
                            onClick={handlePrint} 
                            style={hoveredBtn === 'print' ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                            onMouseEnter={() => setHoveredBtn('print')}
                            onMouseLeave={() => setHoveredBtn("")}
                        >
                            Export/Print Plan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostOpCare;
