package com.group4.cloud.dao;



import org.springframework.data.repository.CrudRepository;

import com.group4.cloud.model.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface VehicleRepository extends CrudRepository<Vehicle, String>, JpaRepository<Vehicle, String> {
}