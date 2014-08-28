package com.sprinkle.web.security.service.manager;


import com.sprinkle.web.security.domain.User;


/**
 * package: com.sprinkle.web.security.service.manager date: 27.04.14
 * 
 * @author Skurishin Vladislav
 */
public interface UserManager
{
    /**
     * Sign up new user.
     * 
     * @param email token
     * @param name token
     * @param surname token
     * @param password token
     * @return user object
     */
    public User signUp(final String email, final String name, final String surname, final String password);


    /**
     * Get user by email.
     * 
     * @param email token
     * @return user or null, if not found
     */
    public User getUser(String email);
}
