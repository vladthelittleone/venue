package com.sprinkle.web.security.service.manager;


import com.sprinkle.web.security.domain.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shared.sprinkle.service.account.Account;
import shared.sprinkle.service.account.AccountServiceAPI;


/**
 * package: com.sprinkle.web.security.service date: 20.04.14
 * 
 * @author Skurishin Vladislav
 */
@Service
public class CustomUserManager implements UserManager
{
    private final Logger logger = Logger.getLogger(CustomUserManager.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountServiceAPI accountService;


    /**
     * Sign up new user.
     * 
     * @param email token
     * @param name token
     * @param surname token
     * @param password token
     * @return user object
     */
    @Override
    public User signUp(final String email, final String name, final String surname, final String password)
    {
        if (logger.isInfoEnabled())
            logger.info(String.format("Start to register a new account. Email: %s, Fullname: %s %s.", email, name,
                    surname));

        Account account = accountService.addAccount(email, name, surname, passwordEncoder.encode(password));
        
        if (logger.isInfoEnabled())
            logger.info(String.format("New account registered. Email: %s, Fullname: %s %s.", email, name,
                    surname));

        return new User(account);
    }


    /**
     * Get user by email.
     * 
     * @param email token
     * @return user or null, if not found
     */
    @Override
    public User getUser(String email)
    {
        Account account = accountService.getAccount(email);
        return new User(account);
    }

}