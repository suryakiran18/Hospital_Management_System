package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Patient;
import com.company.sample_app_sql.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Create a new patient
    public Patient createPatient(Patient patient) {

        return patientRepository.save(patient);
    }

    // Get patient by ID
    public Optional<Patient> getPatientById(Long patientId) {
        return patientRepository.findById(patientId);
    }

    // Get all patients
    public Iterable<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Update patient details
    public Patient updatePatient(Long patientId, Patient patientDetails) {
        Optional<Patient> optionalPatient = patientRepository.findById(patientId);
        if (optionalPatient.isPresent()) {
            Patient existingPatient = optionalPatient.get();
            existingPatient.setDob(patientDetails.getDob());
            existingPatient.setPhnNum(patientDetails.getPhnNum());
            existingPatient.setAddress(patientDetails.getAddress());
            existingPatient.setMedicalHistory(patientDetails.getMedicalHistory());
            return patientRepository.save(existingPatient);
        }
        return null;
    }

    // Delete patient
    public void deletePatient(Long patientId) {
        patientRepository.deleteById(patientId);
    }
}
