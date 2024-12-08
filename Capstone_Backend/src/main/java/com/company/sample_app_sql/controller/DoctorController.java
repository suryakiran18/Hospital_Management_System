package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Doctor;
import com.company.sample_app_sql.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Get all doctors
    @GetMapping("/all")
    public ResponseEntity<Iterable<Doctor>> getAllDoctors() {
        Iterable<Doctor> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    // Get doctor by ID
    @GetMapping("/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long doctorId) {
        Optional<Doctor> doctor = doctorService.getDoctorById(doctorId);
        if (doctor.isPresent()) {
            return new ResponseEntity<>(doctor.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Create a new doctor
    @PostMapping("/create")
    public ResponseEntity<String> createDoctor(@RequestBody Doctor doctor) {
        Doctor createdDoctor = doctorService.createDoctor(doctor);
        if (createdDoctor != null) {
            return new ResponseEntity<>("Doctor created successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Doctor creation failed.", HttpStatus.BAD_REQUEST);
    }

    // Update doctor details
    @PutMapping("/update/{doctorId}")
    public ResponseEntity<String> updateDoctor(@PathVariable Long doctorId, @RequestBody Doctor updatedDoctor) {
        Doctor updated = doctorService.updateDoctor(doctorId, updatedDoctor);
        if (updated != null) {
            return new ResponseEntity<>("Doctor updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
    }

    // Delete doctor by ID
    @DeleteMapping  ("/delete/{doctorId}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        return new ResponseEntity<>("Doctor deleted successfully", HttpStatus.OK);
    }
}
