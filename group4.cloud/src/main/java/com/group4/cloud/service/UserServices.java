package com.group4.cloud.service;


import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;


import com.group4.cloud.model.User;


public interface UserServices
{
    List<User> listAll();
    
    Iterable<User> getById(Long id);
    
    void delete(Long id);

    List<User> saveUser(User user);
    
    TypedQuery<User> constructQuery(Map<String, String> customQuery);
    
    int numberOfUsers();


}
