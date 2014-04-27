package com.sprinkle.web.security.service;

import com.sprinkle.web.security.service.manager.UserManager;
import org.apache.log4j.Logger;
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
public class SprinkleUserDetailsService implements UserDetailsService
{
    private Logger logger = Logger.getLogger(SprinkleUserDetailsService.class);

    @Autowired
    private UserManager userManager;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException
    {
        if (logger.isDebugEnabled())
            logger.debug(String.format("Load user by username [%s]", username));

        UserDetails userDetails = userManager.getUser(username);

        if (userDetails == null)
        {
            if (logger.isDebugEnabled())
                logger.debug(String.format("User [%s] not found", username));

            throw new UsernameNotFoundException(String.format("User [%s] not found", username));
        }

        return userManager.getUser(username);
    }

    public void setUserManager(UserManager userManager)
    {
        this.userManager = userManager;
    }
}