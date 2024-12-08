package com.company.sample_app_sql.entity;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Contactform {
    private String name;
    private String email;
    private String subject;
    private String message;
}
