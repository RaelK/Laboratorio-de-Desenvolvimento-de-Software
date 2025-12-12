package com.example.bitStudent.repository;

import com.example.bitStudent.model.Resgate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResgateRepository extends JpaRepository<Resgate, Long> {

}