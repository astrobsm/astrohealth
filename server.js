const express = require('express');
const path = require('path');
const portfinder = require('portfinder'); // Add portfinder for dynamic port selection
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());
// NEW: Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve static assets for enhanced frontend
app.use('/assets', express.static(path.join(__dirname, 'frontend', 'assets')));

// Import routes
const patientRoutes = require('./backend/routes/patientRoutes');

// Use patient routes
app.use('/api/patients', patientRoutes);

// Add middleware for logging requests in production
if (process.env.NODE_ENV === 'production') {
    const morgan = require('morgan');
    app.use(morgan('combined'));
}

// Mock database for hospitals (replace with actual database logic)
const hospitals = [];

// Endpoint to register a hospital
app.post('/api/register-hospital', (req, res) => {
    console.log("Register Hospital Request Body:", req.body); // added for debugging

    const { hospitalName, location, contact, capacity } = req.body;
    
    // Ensure all fields are provided
    if (!hospitalName || !location || !contact || !capacity) {
        console.error("Missing required fields:", { hospitalName, location, contact, capacity });
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Trim string inputs and convert capacity to a number
    const trimmedName = hospitalName.trim();
    const trimmedLocation = location.trim();
    const trimmedContact = contact.trim();
    const parsedCapacity = Number(capacity);
    
    if (!trimmedName || !trimmedLocation || !trimmedContact || isNaN(parsedCapacity)) {
        console.error("Invalid input values:", { trimmedName, trimmedLocation, trimmedContact, parsedCapacity });
        return res.status(400).json({ message: 'Invalid input values' });
    }
    
    const newHospital = { 
        hospitalName: trimmedName, 
        location: trimmedLocation, 
        contact: trimmedContact, 
        capacity: parsedCapacity 
    };
    
    hospitals.push(newHospital);
    console.log("Hospital registered successfully:", newHospital);
    return res.status(201).json({ message: 'Hospital registered successfully', hospital: newHospital });
});

// Endpoint to fetch hospital details
app.get('/api/hospitals', (req, res) => {
    return res.status(200).json(hospitals);
});

// Ensure React build files are served correctly in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Start the server with dynamic port selection
portfinder.basePort = PORT;
portfinder.getPort((err, availablePort) => {
    if (err) {
        console.error('Error finding available port:', err);
        process.exit(1);
    } else {
        app.listen(availablePort, () => {
            console.log(`Server is running on http://localhost:${availablePort}`);
        });
    }
});