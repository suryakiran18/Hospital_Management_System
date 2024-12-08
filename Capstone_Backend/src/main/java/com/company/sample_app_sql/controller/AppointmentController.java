package com.company.sample_app_sql.controller;

import com.company.sample_app_sql.entity.Appointment;
import com.company.sample_app_sql.entity.Contactform;
import com.company.sample_app_sql.entity.Notification;
import com.company.sample_app_sql.service.AppointmentService;
import com.company.sample_app_sql.service.EmailService;
import com.company.sample_app_sql.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private EmailService sendEmailService;

    // Get all appointments
    @GetMapping("/all")
    public ResponseEntity<Iterable<Appointment>> getAllAppointments() {
        Iterable<Appointment> appointments = appointmentService.getAllAppointments();
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Get appointment by ID
    @GetMapping("/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long appointmentId) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(appointmentId);
        if (appointment.isPresent()) {
            return new ResponseEntity<>(appointment.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get appointments by patient ID
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(patientId);
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Get appointments by doctor ID
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        if (appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createAppointment(@RequestBody Appointment appointment) {
        // Create the appointment
        Appointment createdAppointment = appointmentService.createAppointment(appointment);
        if (createdAppointment != null) {
            // Generate notification
            Notification notification = new Notification();
        notification.setMessage("Your appointment is scheduled");
            notification.setDate(LocalDate.now());

            // Save notification
            notificationService.createNotification(notification);


            return new ResponseEntity<>("Appointment created successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Appointment creation failed.", HttpStatus.BAD_REQUEST);
    }


    // Delete appointment by ID
    @DeleteMapping("/delete/{appointmentId}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return new ResponseEntity<>("Appointment deleted successfully", HttpStatus.OK);
    }


    // Update appointment details
    @PutMapping("/update/{appointmentId}")
    public ResponseEntity<String> updateAppointment(@PathVariable Long appointmentId, @RequestBody Appointment updatedAppointment) {
        Appointment updated = appointmentService.updateAppointment(appointmentId, updatedAppointment);
        if (updated != null) {
            return new ResponseEntity<>("Appointment updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Appointment not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/approve/{appointmentId}")
    public ResponseEntity<String> approveAppointment(@PathVariable Long appointmentId) {
        Optional<Appointment> appointmentOpt = appointmentService.getAppointmentById(appointmentId);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            if ("approved".equals(appointment.getStatus())) {
                return new ResponseEntity<>("Appointment is already approved.", HttpStatus.BAD_REQUEST);
            }
            appointment.setStatus("approved");
            appointmentService.updateAppointmentStatus(appointment);

            // Send email to the patient's email
            String patientEmail = appointment.getPatient().getUser().getEmail();
            String subject = "Appointment Approved";
            String body = "Dear " + appointment.getPatient().getUser().getUsername() + ",\n\n" +
                    "Your appointment with Dr. " + appointment.getDoctor().getName() + " has been approved.\n" +
                    "Appointment Details:\n" +
                    "Date and Time: " + appointment.getDateTime() + "\n" +
                    "Reason: " + appointment.getReason() + "\n\n" +
                    "Thank you,\nYour Adarsha(Surya)";

            sendEmailService.sendEmail(patientEmail, subject, body);

            return new ResponseEntity<>("Appointment approved successfully and email sent.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Appointment not found.", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/doctor/{doctorId}/pending")
    public ResponseEntity<List<Appointment>> getPendingAppointmentsForDoctor(@PathVariable Long doctorId) {
        List<Appointment> pendingAppointments = appointmentService.getPendingAppointmentsByDoctorId(doctorId);
        if (pendingAppointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(pendingAppointments, HttpStatus.OK);
    }
    @PutMapping("/reject/{appointmentId}")
    public ResponseEntity<String> rejectAppointment(@PathVariable Long appointmentId) {
        Optional<Appointment> appointmentOpt = appointmentService.getAppointmentById(appointmentId);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            if ("rejected".equals(appointment.getStatus())) {
                return new ResponseEntity<>("Appointment is already rejected.", HttpStatus.BAD_REQUEST);
            }
            appointment.setStatus("rejected");
            appointmentService.updateAppointmentStatus(appointment);
            return new ResponseEntity<>("Appointment rejected successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Appointment not found.", HttpStatus.NOT_FOUND);
    }


    @PutMapping("/sendSOS/{appointmentId}")
    public ResponseEntity<String> sendSOS(@PathVariable Long appointmentId) {
        Optional<Appointment> appointmentOpt = appointmentService.getAppointmentById(appointmentId);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();

            // Check if the appointment is an emergency
            if (!appointment.isEmergency()) {
                return new ResponseEntity<>("This appointment is not marked as an emergency.", HttpStatus.BAD_REQUEST);
            }

            // Send SOS email to the doctor's email
            String doctorEmail = appointment.getDoctor().getUser().getEmail();
            String subject = "Emergency Alert!";
            String body = "This is an emergency alert for your appointment with patient "
                    + appointment.getPatient().getUser().getUsername() + " (Patient ID: "
                    + appointment.getPatient().getPatientId() + ").\n\n"
                    + "Appointment Details:\n"
                    + "Reason: " + appointment.getReason() + "\n"
                    + "Date and Time: " + appointment.getDateTime() + "\n\n"
                    + "Please take immediate action.\n\n"
                    + "Best Regards,\nAdarsha";

            sendEmailService.sendEmail(doctorEmail, subject, body);

            return new ResponseEntity<>("Emergency email sent successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Appointment not found.", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/contact")
    public ResponseEntity<String> submitContactForm(@RequestBody Contactform contactForm) {

        String name = contactForm.getName();
        String email = contactForm.getEmail();
        String subject = contactForm.getSubject();
        String message = contactForm.getMessage();


        String body = "Message from: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message: \n" + message;


        String toEmail = "chintalapudisurya78@gmail.com";
        sendEmailService.sendEmail(toEmail, body, subject);

        return ResponseEntity.ok("Thank you for contacting us. We will get back to you shortly.");
    }


}


