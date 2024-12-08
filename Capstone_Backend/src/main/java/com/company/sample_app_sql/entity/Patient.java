package com.company.sample_app_sql.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
public class Patient {

    // Getters and Setters
    @Id
    @Column(name = "patient_id")
    private Long patientId;



    @Column(nullable = false)
    private Integer dob;

    @Column(nullable = false, unique = true)
    private Long phnNum;

    private String address;
    private String medicalHistory;

    @OneToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "user_id", nullable = false)
    private Users user;


}



