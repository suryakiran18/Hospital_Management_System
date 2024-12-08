package com.company.sample_app_sql.service;

import com.company.sample_app_sql.entity.Appointment;
import com.company.sample_app_sql.repository.AppointmentRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    public Iterable<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId);
    }

    // Get appointments by patient ID
    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatient_PatientId(patientId);
    }

    // Get appointments by doctor ID
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctor_DoctorId(doctorId);
    }

    // Create a new appointment
    public Appointment createAppointment(Appointment appointment) {
        if (appointment.getDateTime() == null) {
            throw new IllegalArgumentException("dateTime cannot be null");
        }
        appointment.setStatus("pending");
        return appointmentRepository.save(appointment);
    }
    public Appointment updateAppointmentStatus(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPendingAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctor_DoctorIdAndStatus(doctorId, "pending");
    }


    // Delete appointment by ID
    public void deleteAppointment(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }



    public Appointment updateAppointment(Long appointmentId, Appointment updatedAppointment) {
        Optional<Appointment> existingAppointment = appointmentRepository.findById(appointmentId);
        if (existingAppointment.isPresent()) {
            Appointment appointment = existingAppointment.get();
            appointment.setDateTime(updatedAppointment.getDateTime());
            appointment.setReason(updatedAppointment.getReason());
            appointment.setEmergency(updatedAppointment.isEmergency());
            appointment.setDoctor(updatedAppointment.getDoctor());
            appointment.setPatient(updatedAppointment.getPatient());
            return appointmentRepository.save(appointment);
        }
        return null;
    }
}
