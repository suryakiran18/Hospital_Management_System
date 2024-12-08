package com.company.sample_app_sql.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "Notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notification_id")
    private Integer notificationId;

    @Column(name = "Date", nullable = false)
    private LocalDate date;

    @Column(name = "Message", length = 255, nullable = false)
    private String message;





    // Getters and Setters
}
