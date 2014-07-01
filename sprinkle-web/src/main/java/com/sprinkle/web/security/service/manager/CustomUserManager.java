package com.sprinkle.web.security.service.manager;

import com.sprinkle.web.security.domain.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.atomic.AtomicLong;

/**
 * package: com.sprinkle.web.security.service
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class CustomUserManager implements UserManager
{
    private final Logger logger = Logger.getLogger(CustomUserManager.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final AtomicLong userId = new AtomicLong(0);
    private final ConcurrentHashMap<Long, User> users = new ConcurrentHashMap<>();
    private final ConcurrentSkipListSet<String> usernames = new ConcurrentSkipListSet<>();

    /**
     * Sign up new user.
     *
     * @param username token
     * @param fullname token
     * @param password token
     * @return user object
     */
    @Override
    public User signUp(final String username, final String fullname, final String password)
    {
        String hashedPassword = passwordEncoder.encode(password);

        if (logger.isTraceEnabled())
            logger.trace(String.format("Sign up new user [%s, %s, %s]", username, fullname, hashedPassword));

        if (username.isEmpty() || password.isEmpty() || fullname.isEmpty()) return null;
        if (!usernames.add(username)) return null;

        long id = userId.incrementAndGet();

        User user = new User(id, username, hashedPassword, fullname, "ROLE_USER");

        users.put(id, user);

        return user;
    }


    /**
     * Get user by username.
     *
     * @param username token
     * @return user or null, if not found
     */
    @Override
    public User getUser(String username)
    {
        for (User user : users.values())
        {
            if (user.getUsername().equals(username))
            {
                if (logger.isTraceEnabled())
                    logger.trace(String.format("Get user %s", user));

                return user;
            }
        }
        return null;
    }


    /**
     * Get user by id.
     *
     * @param userId id
     * @return user or null, if not found
     */
    @Override
    public User getUser(Long userId)
    {
        for (User user : users.values())
        {
            if (user.getId() == userId)
            {
                return user;
            }
        }
        return null;
    }
}