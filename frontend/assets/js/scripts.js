// JavaScript code for handling user interactions and dynamic content updates

document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners
    initEventListeners();
});

function initEventListeners() {
    const appointmentButtons = document.querySelectorAll('.appointment-button');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', handleAppointmentClick);
    });
}

function handleAppointmentClick(event) {
    const appointmentId = event.target.dataset.appointmentId;
    fetchAppointmentDetails(appointmentId);
}

function fetchAppointmentDetails(appointmentId) {
    fetch(`/api/appointments/${appointmentId}`)
        .then(response => response.json())
        .then(data => {
            displayAppointmentDetails(data);
        })
        .catch(error => {
            console.error('Error fetching appointment details:', error);
        });
}

function displayAppointmentDetails(data) {
    const detailsContainer = document.getElementById('appointment-details');
    detailsContainer.innerHTML = `
        <h2>Appointment Details</h2>
        <p>Date: ${data.date}</p>
        <p>Time: ${data.time}</p>
        <p>Patient: ${data.patientName}</p>
        <p>Status: ${data.status}</p>
    `;
}

// Functionality for offline capabilities
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}