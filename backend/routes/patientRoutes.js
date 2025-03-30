const express = require('express');
const PatientController = require('../controllers/patientController');

const router = express.Router();
const patientController = new PatientController();

router.get('/patients/:id', patientController.getPatient);
router.post('/patients', patientController.createPatient);
router.put('/patients/:id', patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;