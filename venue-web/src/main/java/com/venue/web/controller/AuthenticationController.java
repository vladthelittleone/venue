package com.venue.web.controller;

import com.venue.web.common.exception.IllegalAuthenticationProperties;
import com.venue.web.common.validator.AuthenticationValidator;
import com.venue.web.security.domain.User;
import com.venue.web.security.domain.factory.AuthenticationStatus;
import com.venue.web.security.domain.factory.StatusFactory;
import com.venue.web.security.domain.json.SignUpRequest;
import com.venue.web.security.service.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * package: com.venue.web.controllers
 * date: 06.05.14
 *
 * Controller that responding for authentication.
 * Provides sign up function and profile status.
 *
 * @see com.venue.web.security.service.manager.UserManager
 * @author Skurishin Vladislav
 */
@Controller
@RequestMapping("/authenticationService")
public class AuthenticationController
{
    @Autowired
    private AuthenticationValidator validator;

    @Autowired
    private UserManager userManager;

    @Autowired
    private StatusFactory factory;

    /**
     * Sign up new user
     *
     * @param a - authentication information, such as username, password, fullname.
     * @return authentication status
     */
    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    @ResponseBody
    public AuthenticationStatus singUp(@RequestBody SignUpRequest a)
    {
        try
        {
            validator.validate(a.getUsername(), a.getFullname(), a.getPassword());
            userManager.signUp(a.getUsername(), a.getFullname(), a.getPassword());
            return factory.successAuthenticationStatus();
        }
        catch (IllegalAuthenticationProperties e)
        {
            return factory.failureAuthenticationStatus(e.getMessage());
        }
    }

    /**
     * Check user authentication. If not authenticate, then spring security
     * send error using {@link com.venue.web.security.service.handler.CustomAuthenticationEntryPoint}.
     *
     * @return authentication status
     * @see {@link com.venue.web.security.service.handler.CustomAuthenticationEntryPoint}
     * @see {@link com.venue.web.security.domain.json.CustomAuthenticationStatus}
     */
    @RequestMapping(value = "/profileStatus.json")
    @ResponseBody
    public AuthenticationStatus getProfileStatus()
    {
        // TODO подумать как обезопасить себя

        // Данный метод не будет вызываться, если пользователь не авторизирован и следовательно
        // не будет исключения приведения типов.
        //
        // If user is not authenticate in service, this method should not invoke. That why we should not
        // get ClassCastException.
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return factory.profileStatus(user.getUsername(), user.getId());
    }
}
