package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Doctor;
import com.company.sample_app_sql.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Get all doctors
    public Iterable<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get doctor by ID
    public Optional<Doctor> getDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId);
    }

    // Create a new doctor
    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Update doctor details
    public Doctor updateDoctor(Long doctorId, Doctor updatedDoctor) {
        Optional<Doctor> existingDoctor = doctorRepository.findById(doctorId);
        if (existingDoctor.isPresent()) {
            Doctor doctor = existingDoctor.get();
            doctor.setName(updatedDoctor.getName());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            doctor.setContactInfo(updatedDoctor.getContactInfo());
            doctor.setAvailability(updatedDoctor.getAvailability());
            doctor.setDepartment(updatedDoctor.getDepartment());
            return doctorRepository.save(doctor);
        }
        return null;
    }

    // Delete doctor by ID
    public void deleteDoctor(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }
}
