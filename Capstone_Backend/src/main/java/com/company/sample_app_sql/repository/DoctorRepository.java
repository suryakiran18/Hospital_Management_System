package com.company.sample_app_sql.repository;

import com.company.sample_app_sql.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Custom queries can be added here if needed
}
