package com.group4.cloud.service;



import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;

import com.group4.cloud.model.User;
import com.group4.cloud.model.Vehicle;
import com.group4.cloud.model.VehicleStatus;


public interface VehicleServices
{
    List<Vehicle> listAll();
    
    Iterable<Vehicle> getById(String id);

    void delete(String id);

    void saveVehicle(Vehicle vehicle);
    
    TypedQuery<Vehicle> constructQuery(Map<String, String> customQuery);
    
    int numberOfAVs();
    
    List<VehicleStatus> getVehicleStatus();

}
