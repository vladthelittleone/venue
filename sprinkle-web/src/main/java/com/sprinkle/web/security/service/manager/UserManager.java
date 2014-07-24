package com.sprinkle.web.security.service.manager;

import com.sprinkle.web.common.exception.IllegalAuthenticationProperties;
import com.sprinkle.web.security.domain.User;

/**
 * package: com.sprinkle.web.security.service.manager
 * date: 27.04.14
 *
 * @author Skurishin Vladislav
 */
public interface UserManager
{
    /**
     * Sign up new user.
     *
     * @param username token
     * @param fullname token
     * @param password token
     * @return user object
     */
    public User signUp(final String username, final String fullname, final String password) throws IllegalAuthenticationProperties;

    /**
     * Get user by id.
     *
     * @param userId id
     * @return user or null, if not found
     */
    public User getUser(Long userId);

    /**
     * Get user by username.
     *
     * @param username token
     * @return user or null, if not found
     */
    public User getUser(String username);
}
