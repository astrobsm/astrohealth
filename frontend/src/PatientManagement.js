import React, { useState, useEffect } from 'react';
import RegisterPatient from './RegisterPatient';
import RegisterHospital from './RegisterHospital';
import PatientsList from './PatientsList';
import InPatients from './InPatients';
import OutPatients from './OutPatients';
import HomeCare from './HomeCare';
import PatientReview from './PatientReview';
import WoundCare from './WoundCare';
import DiabeticFootCare from './DiabeticFootCare';
import DietaryPlans from './DietaryPlans';
import BookAppointment from './BookAppointment';
import BookSurgery from './BookSurgery';
import PreOpEvaluation from './PreOpEvaluation';
import DVTRiskAssessment from './DVTRiskAssessment';
import PostOpCare from './PostOpCare';
import DischargeProtocols from './DischargeProtocols';
import PressureSoreRiskAssessment from './PressureSoreRiskAssessment';
import HospitalList from './HospitalList'; // Import the HospitalList component

function PatientManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [clinicalEntries, setClinicalEntries] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [showRegisterPatient, setShowRegisterPatient] = useState(false);
    const [showRegisterHospital, setShowRegisterHospital] = useState(false);
    const [showPatientsList, setShowPatientsList] = useState(false);
    const [showInPatients, setShowInPatients] = useState(false);
    const [showOutPatients, setShowOutPatients] = useState(false);
    const [showHomeCare, setShowHomeCare] = useState(false);
    const [showPatientReview, setShowPatientReview] = useState(false);
    const [showWoundCare, setShowWoundCare] = useState(false);
    const [showDiabeticFootCare, setShowDiabeticFootCare] = useState(false);
    const [showDietaryPlans, setShowDietaryPlans] = useState(false);
    const [showBookAppointment, setShowBookAppointment] = useState(false);
    const [showBookSurgery, setShowBookSurgery] = useState(false);
    const [showPreOpEvaluation, setShowPreOpEvaluation] = useState(false);
    const [showDVTRiskAssessment, setShowDVTRiskAssessment] = useState(false);
    const [showPostOpCare, setShowPostOpCare] = useState(false);
    const [showDischargeProtocols, setShowDischargeProtocols] = useState(false);
    const [showPressureSoreRiskAssessment, setShowPressureSoreRiskAssessment] = useState(false);
    const [showHospitalList, setShowHospitalList] = useState(false); // State to toggle Hospital List page
    const [patients, setPatients] = useState([]);
    const [hospitals, setHospitals] = useState([]); // Add state for hospitals

    const addPatient = (patient) => {
        setPatients([...patients, patient]);
    };

    const updatePatient = (updatedPatient) => {
        setPatients(
            patients.map((patient) =>
                patient.name === updatedPatient.name ? updatedPatient : patient
            )
        );
    };

    useEffect(() => {
        if (searchQuery) {
            fetch(`/api/patients/search?query=${searchQuery}`)
                .then((res) => res.json())
                .then((data) => setSuggestions(data))
                .catch((err) => console.error(err));
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        // Fetch hospitals from the backend
        fetch('/api/hospitals')
            .then((res) => res.json())
            .then((data) => setHospitals(data))
            .catch((err) => console.error('Error fetching hospitals:', err));
    }, []);

    const fetchPatientDetails = (name) => {
        fetch(`/api/patients/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedPatient(data.patient);
                setClinicalEntries(data.clinicalEntries);
            })
            .catch((err) => console.error(err));
    };

    const addClinicalEntry = () => {
        if (!newReview || !dateTime) {
            alert('Review and date/time are required');
            return;
        }

        fetch(`/api/patients/${selectedPatient.name}/clinical-entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ review: newReview, dateTime }),
        })
            .then((res) => res.json())
            .then(() => {
                alert('Clinical review entry added successfully');
                setNewReview('');
                setDateTime('');
                fetchPatientDetails(selectedPatient.name);
            })
            .catch((err) => console.error(err));
    };

    if (showRegisterPatient) {
        return (
            <RegisterPatient
                goBack={() => setShowRegisterPatient(false)}
                addPatient={addPatient}
            />
        );
    }

    if (showRegisterHospital) {
        return (
            <RegisterHospital
                goBack={() => setShowRegisterHospital(false)}
            />
        );
    }

    if (showPatientsList) {
        return <PatientsList goBack={() => setShowPatientsList(false)} patients={patients} />;
    }

    if (showInPatients) {
        const inPatients = patients.filter((patient) => patient.patientType === 'In-patient');
        return <InPatients goBack={() => setShowInPatients(false)} patients={inPatients} />;
    }

    if (showOutPatients) {
        const outPatients = patients.filter((patient) => patient.patientType === 'Out-patient');
        return <OutPatients goBack={() => setShowOutPatients(false)} patients={outPatients} />;
    }

    if (showHomeCare) {
        return <HomeCare goBack={() => setShowHomeCare(false)} patients={patients} />;
    }

    if (showPatientReview) {
        return (
            <PatientReview
                goBack={() => setShowPatientReview(false)}
                patients={patients}
                hospitals={hospitals} // Pass hospitals to PatientReview
                updatePatient={updatePatient}
            />
        );
    }

    if (showWoundCare) {
        return <WoundCare goBack={() => setShowWoundCare(false)} />;
    }

    if (showDiabeticFootCare) {
        return <DiabeticFootCare goBack={() => setShowDiabeticFootCare(false)} />;
    }

    if (showDietaryPlans) {
        return <DietaryPlans goBack={() => setShowDietaryPlans(false)} />;
    }

    if (showBookAppointment) {
        return <BookAppointment goBack={() => setShowBookAppointment(false)} />;
    }

    if (showBookSurgery) {
        return <BookSurgery goBack={() => setShowBookSurgery(false)} />;
    }

    if (showPreOpEvaluation) {
        return <PreOpEvaluation goBack={() => setShowPreOpEvaluation(false)} />;
    }

    if (showDVTRiskAssessment) {
        return <DVTRiskAssessment goBack={() => setShowDVTRiskAssessment(false)} />;
    }

    if (showPostOpCare) {
        return <PostOpCare goBack={() => setShowPostOpCare(false)} />;
    }

    if (showDischargeProtocols) {
        return <DischargeProtocols goBack={() => setShowDischargeProtocols(false)} />;
    }

    if (showPressureSoreRiskAssessment) {
        return <PressureSoreRiskAssessment goBack={() => setShowPressureSoreRiskAssessment(false)} />;
    }

    if (showHospitalList) {
        return (
            <HospitalList goBack={() => setShowHospitalList(false)} /> // Navigate back to Patient Management
        );
    }

    return (
        <div className="patient-management">
            <h1>Patient Management</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search patient by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul className="suggestions-list">
                    {suggestions.map((patient) => (
                        <li
                            key={patient.name}
                            onClick={() => {
                                setSearchQuery('');
                                setSuggestions([]);
                                fetchPatientDetails(patient.name);
                            }}
                        >
                            {patient.name}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedPatient && (
                <div className="patient-details">
                    <h2>Details for {selectedPatient.name}</h2>
                    <p>Age: {selectedPatient.age}</p>
                    <p>Condition: {selectedPatient.condition}</p>
                    <p>Hospital: {selectedPatient.hospitalName}</p>
                    <h3>Clinical Entries</h3>
                    <ul>
                        {clinicalEntries.map((entry, index) => (
                            <li key={index}>
                                <p>{entry.review}</p>
                                <p>{entry.dateTime}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="add-clinical-entry">
                        <h3>Add Clinical Review</h3>
                        <textarea
                            placeholder="Enter review"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                        />
                        <button onClick={addClinicalEntry}>Add Review</button>
                    </div>
                </div>
            )}
            <div className="button-group">
                <button
                    className="management-button"
                    onClick={() => setShowInPatients(true)}
                >
                    Inpatients
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowOutPatients(true)}
                >
                    Outpatients
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowHomeCare(true)}
                >
                    Homecare
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowWoundCare(true)}
                >
                    Woundcare Protocols
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowDiabeticFootCare(true)}
                >
                    Diabetic Foot Care
                </button>
                <button
                    className="circular-button"
                    onClick={() => setShowPatientReview(true)}
                >
                    +
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowBookAppointment(true)}
                >
                    Book an Appointment
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowBookSurgery(true)}
                >
                    Book Surgeries
                </button>
                <button className="management-button">Woundcare Protocols</button>
                <button
                    className="management-button"
                    onClick={() => setShowPreOpEvaluation(true)}
                >
                    Pre-op Evaluations
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowPostOpCare(true)}
                >
                    Post-op Care
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowDischargeProtocols(true)}
                >
                    Discharge Protocols
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowDietaryPlans(true)}
                >
                    Dietary Plans
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowDVTRiskAssessment(true)}
                >
                    DVT Prophylaxis
                </button>
                <button
                    className="management-button"
                    onClick={() => setShowPressureSoreRiskAssessment(true)}
                >
                    Pressure Sore Prevention Protocols
                </button>
                <button
                    className="management-button blue-button"
                    onClick={() => setShowRegisterPatient(true)}
                >
                    Register a Patient
                </button>
                <button
                    className="management-button blue-button"
                    onClick={() => setShowRegisterHospital(true)}
                >
                    Register a Hospital
                </button>
                <button
                    className="management-button blue-button"
                    onClick={() => setShowPatientsList(true)}
                >
                    Patients List
                </button>
                <button
                    className="management-button blue-button"
                    onClick={() => setShowHospitalList(true)} // Navigate to Hospital List page
                >
                    View Registered Hospitals
                </button>
            </div>
        </div>
    );
}

export default PatientManagement;
