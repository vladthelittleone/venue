package com.sprinkle.web.security.service.manager;

import com.sprinkle.web.security.domain.User;
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
    private final AtomicLong userId = new AtomicLong(0);
    private final ConcurrentHashMap<Long, User> users = new ConcurrentHashMap<>();
    private final ConcurrentSkipListSet<String> userNames = new ConcurrentSkipListSet<>();

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
        if (!userNames.add(username)) return null;
        if (username.isEmpty() || password.isEmpty() || username.isEmpty()) return null;

        Long id = userId.incrementAndGet();
        User user = new User(id, username, password, fullname, "ROLE_USER");
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