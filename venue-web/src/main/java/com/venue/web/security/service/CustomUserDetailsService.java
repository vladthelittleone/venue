package com.venue.web.security.service;

import com.venue.web.security.service.manager.UserManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * package: com.venue.web.security
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class CustomUserDetailsService implements UserDetailsService
{
    private Logger logger = Logger.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserManager userManager;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException
    {
        // Set username to lower case
        String u = username.toLowerCase();

        if (logger.isTraceEnabled())
            logger.trace(String.format("Load user by username [%s]", u));

        UserDetails userDetails = userManager.getUser(u);

        if (userDetails == null)
        {
            if (logger.isTraceEnabled())
                logger.trace(String.format("User [%s] not found", u));

            throw new UsernameNotFoundException(String.format("User [%s] not found", u));
        }

        return userDetails;
    }

    public void setUserManager(UserManager userManager)
    {
        this.userManager = userManager;
    }
}