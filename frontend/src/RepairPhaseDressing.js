import React from 'react';

function RepairPhaseDressing({ goBack }) {
    return (
        <div className="register-patient-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Repair Phase Dressing Protocol</h1>
            <div className="protocol-details">
                <h3>Steps:</h3>
                <ol>
                    <li>Surgical debridement first.</li>
                    <li>Clean with Wound-Clex solution:
                        <ul>
                            <li>Spray if surface wound.</li>
                            <li>Stream if deep wound.</li>
                        </ul>
                    </li>
                    <li>Apply HERA Wound Gel on a sterile gauze and work it in well into the gauze.</li>
                    <li>Spread the gauze and HERA Gel on the surface of the wound.</li>
                    <li>Apply the WoundCare Honey Gauze.</li>
                    <li>Overlay with sterile dry gauze and cotton wool.</li>
                    <li>Secure with plaster or crepe bandage as appropriate.</li>
                </ol>
            </div>
            <button className="back-button" onClick={goBack}>
                Back
            </button>
        </div>
    );
}

export default RepairPhaseDressing;
