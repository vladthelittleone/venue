package com.venue.web.controller;

import com.venue.web.common.exception.IllegalAuthenticationProperties;
import com.venue.web.common.validator.AuthenticationValidator;
import com.venue.web.security.domain.User;
import com.venue.web.security.domain.json.AuthenticationStatus;
import com.venue.web.security.domain.json.ProfileStatus;
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
            return new AuthenticationStatus(false, null, true);
        } catch (IllegalAuthenticationProperties e)
        {
            return new AuthenticationStatus(false, null, e.getMessage(), false);
        }
    }

    /**
     * Check user authentication. If not authenticate, then spring security
     * send error using {@link com.venue.web.security.service.handler.CustomAuthenticationEntryPoint}.
     *
     * @return authentication status
     * @see {@link com.venue.web.security.service.handler.CustomAuthenticationEntryPoint}
     * @see {@link com.venue.web.security.domain.json.AuthenticationStatus}
     */
    @RequestMapping(value = "/profileStatus.json")
    @ResponseBody
    public AuthenticationStatus getProfileStatus()
    {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ProfileStatus(true, user.getUsername(), user.getId());
    }
}
