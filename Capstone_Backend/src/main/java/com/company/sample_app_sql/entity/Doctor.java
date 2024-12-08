package com.company.sample_app_sql.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter

@Entity
@Table(name = "Doctors")
public class Doctor {

    // Getters and Setters
    @Id
    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Specialization", nullable = false)
    private String specialization;

    @Column(name = "contact_info")
    private String contactInfo;

    @Column(name = "Availability")
    private String availability;

    @Column(name = "Department")
    private String department;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", referencedColumnName = "user_id", nullable = false)
    private Users user;




}
