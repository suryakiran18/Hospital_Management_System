package com.company.sample_app_sql.repository;

import com.company.sample_app_sql.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByPhnNum(Long phnNum); // Check if phone number already exists
}
