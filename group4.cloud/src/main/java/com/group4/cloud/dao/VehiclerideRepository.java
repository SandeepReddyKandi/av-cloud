package com.group4.cloud.dao;



import org.springframework.data.repository.CrudRepository;

import com.group4.cloud.model.Vehicleride;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface VehiclerideRepository extends CrudRepository<Vehicleride, String>, JpaRepository<Vehicleride, String> {
}