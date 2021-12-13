package com.group4.cloud.service;


import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;

import com.group4.cloud.model.Plan;


public interface PlanServices
{
    List<Plan> listAll();
    
    Iterable<Plan> getById(Long id);

    void delete(Long id);

    void savePlan(Plan plan);
    
    TypedQuery<Plan> constructQuery(Map<String, String> customQuery);

}
