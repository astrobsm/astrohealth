import React, { useState } from 'react';
import RescheduleSurgery from './RescheduleSurgery'; // Import the RescheduleSurgery component

function BookedSurgeries({ goBack }) {
    const [surgeries, setSurgeries] = useState([
        {
            id: 1,
            name: 'John Doe',
            surgeryName: 'Appendectomy',
            date: '2023-10-15',
            time: '10:00',
            status: 'Pending',
        },
        {
            id: 2,
            name: 'Jane Smith',
            surgeryName: 'Knee Replacement',
            date: '2023-10-20',
            time: '14:00',
            status: 'Pending',
        },
    ]);

    const [rescheduleSurgery, setRescheduleSurgery] = useState(null); // State for rescheduling surgery

    const handleStatusChange = (id, status) => {
        setSurgeries(
            surgeries.map((surgery) =>
                surgery.id === id ? { ...surgery, status } : surgery
            )
        );
    };

    if (rescheduleSurgery) {
        return (
            <RescheduleSurgery
                surgery={rescheduleSurgery}
                goBack={() => setRescheduleSurgery(null)}
            />
        );
    }

    return (
        <div className="patients-list-container">
            <div className="logo-container">
                <img src="/assets/logo.png" alt="AstroHealth Logo" />
            </div>
            <h1>Booked Surgeries</h1>
            <table className="patients-table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Surgery Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {surgeries.map((surgery) => (
                        <tr key={surgery.id}>
                            <td>{surgery.name}</td>
                            <td>{surgery.surgeryName}</td>
                            <td>{surgery.date}</td>
                            <td>{surgery.time}</td>
                            <td>{surgery.status}</td>
                            <td>
                                <button
                                    className="track-record-button"
                                    onClick={() => handleStatusChange(surgery.id, 'Cancelled')}
                                >
                                    Cancelled
                                </button>
                                <button
                                    className="track-record-button"
                                    onClick={() => handleStatusChange(surgery.id, 'Done')}
                                >
                                    Done
                                </button>
                                <button
                                    className="track-record-button"
                                    onClick={() => setRescheduleSurgery(surgery)}
                                >
                                    Reschedule
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={goBack}>
                Back
            </button>
        </div>
    );
}

export default BookedSurgeries;
