class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }

    async getPatient(req, res) {
        try {
            const patientId = req.params.id;
            const patient = await this.patientService.getPatientById(patientId);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving patient', error });
        }
    }

    async createPatient(req, res) {
        try {
            const newPatient = req.body;
            const createdPatient = await this.patientService.createPatient(newPatient);
            res.status(201).json(createdPatient);
        } catch (error) {
            res.status(500).json({ message: 'Error creating patient', error });
        }
    }

    async updatePatient(req, res) {
        try {
            const patientId = req.params.id;
            const updatedData = req.body;
            const updatedPatient = await this.patientService.updatePatient(patientId, updatedData);
            if (!updatedPatient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(updatedPatient);
        } catch (error) {
            res.status(500).json({ message: 'Error updating patient', error });
        }
    }

    async deletePatient(req, res) {
        try {
            const patientId = req.params.id;
            const deletedPatient = await this.patientService.deletePatient(patientId);
            if (!deletedPatient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting patient', error });
        }
    }
}

module.exports = PatientController;