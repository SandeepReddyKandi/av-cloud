package com.group4.cloud.dao;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.group4.cloud.model.Plan;


public interface PlanRepository extends CrudRepository<Plan, Long>, JpaRepository<Plan, Long>{
	
}
