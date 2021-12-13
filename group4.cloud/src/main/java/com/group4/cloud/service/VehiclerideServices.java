package com.group4.cloud.service;



import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;
import com.group4.cloud.model.Vehicleride;





public interface VehiclerideServices
{
    List<Vehicleride> listAll();
    
    Iterable<Vehicleride> getById(String id);

    void delete(String id);

    void saveVehicleride(Vehicleride vehicleride);
    
    TypedQuery<Vehicleride> constructQuery(Map<String, String> customQuery);
    
}
