package com.sprinkle.web.security.service;

import java.util.HashMap;

import com.sprinkle.web.security.domain.User;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * package: com.sprinkle.web.security.service
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class UserManager
{
    private HashMap<String, User> accounts;

    public UserManager() {
        accounts = new HashMap<>();
        accounts.put("Vlad", new User("Vlad", "1", "ROLE_USER, ROLE_ADMIN"));
        accounts.put("Dima", new User("Dima", "2", "ROLE_USER, ROLE_ADMIN"));
        accounts.put("Kirill", new User("Kirill", "3ы", "ROLE_USER, ROLE_ADMIN"));
    }

    public User getUser(String username) throws UsernameNotFoundException{
        if( !accounts.containsKey( username ) ){
            throw new UsernameNotFoundException( username + " not found" );
        }

        return accounts.get( username );
    }
}