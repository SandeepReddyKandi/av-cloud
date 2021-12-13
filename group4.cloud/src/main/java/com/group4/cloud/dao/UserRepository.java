package com.group4.cloud.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.group4.cloud.model.User;


public interface UserRepository extends CrudRepository<User, Long>, JpaRepository<User, Long>{
}
