package com.sprinkle.web.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * package: com.sprinkle.web.security
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class CustomUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserManager userManager;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException
    {
        return userManager.getUser(username);
    }

}