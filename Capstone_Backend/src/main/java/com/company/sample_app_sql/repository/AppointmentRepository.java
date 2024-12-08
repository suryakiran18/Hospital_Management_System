package com.company.sample_app_sql.repository;

import com.company.sample_app_sql.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Find appointments by patient ID
    List<Appointment> findByPatient_PatientId(Long patientId);

    // Find appointments by doctor ID
    List<Appointment> findByDoctor_DoctorId(Long doctorId);
    List<Appointment> findByDoctor_DoctorIdAndStatus(Long doctorId, String status);

}
