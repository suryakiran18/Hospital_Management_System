package com.company.sample_app_sql.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.time.Instant;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "Appointments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Appointment {

    // Getters and Setters
    @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "appointment_id")
    private Long appointmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Patient_id", nullable = false)
    private Patient patient;

    @Column(name = "date_time", nullable = false)
    private String dateTime;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "Emergency")
    private boolean emergency;

 @Column(name = "status", nullable = false)
 private String status = "pending";

}
