const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    medicalHistory: {
        type: String,
        required: true
    },
    appointments: [{
        date: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        }
    }]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;