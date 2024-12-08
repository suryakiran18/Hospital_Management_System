package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Doctor;
import com.company.sample_app_sql.entity.Patient;
import com.company.sample_app_sql.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/patients")

public class PatientController {

    @Autowired
    private PatientService patientService;

    // Get all patients
    @GetMapping("/all")
    public ResponseEntity<Iterable<Patient>> getAllPatients() {
        Iterable<Patient> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    // Get patient by ID
    @GetMapping("/{patientId}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long patientId) {
        Optional<Patient> patient = patientService.getPatientById(patientId);
        if (patient.isPresent()) {
            return new ResponseEntity<>(patient.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPatient(@RequestBody Patient newPatient) {
        Patient createdPatient = patientService.createPatient(newPatient);
        if (createdPatient != null) {
            return new ResponseEntity<>("Patient created successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Failed to create patient", HttpStatus.BAD_REQUEST);
    }


    // Update patient details
    @PutMapping("/update/{patientId}")
    public ResponseEntity<String> updatePatient(@PathVariable Long patientId, @RequestBody Patient patient) {
        Patient updated = patientService.updatePatient(patientId, patient);
        if (updated != null) {
            return new ResponseEntity<>("Patient updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
    }

    // Delete patient by ID
    @DeleteMapping ("/delete/{patientId}")
    public ResponseEntity<String> deletePatient(@PathVariable Long patientId) {
        patientService.deletePatient(patientId);
        return new ResponseEntity<>("Patient deleted successfully", HttpStatus.OK);
    }
}
