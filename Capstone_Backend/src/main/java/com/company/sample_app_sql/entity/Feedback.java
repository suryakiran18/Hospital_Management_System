package com.company.sample_app_sql.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "Feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Integer feedbackId;



    @ManyToOne (fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "Patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "Doctor_id", nullable = false)
    private Doctor doctor;




    @Column(name = "Rating", nullable = false)
    private Integer rating;

    @Column(name = "Comments", length = 500)
    private String comments;
}
