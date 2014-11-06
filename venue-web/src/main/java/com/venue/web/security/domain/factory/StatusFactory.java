package com.venue.web.security.domain.factory;

import org.springframework.security.core.Authentication;

/**
 * package: com.venue.web.security.domain.factory
 * date: 05.11.14
 *
 * Provide json authentication status objects.
 *
 * @see com.venue.web.security.domain.json.CustomAuthenticationStatus
 * @see com.venue.web.security.domain.json.ProfileStatusCustom
 * @author Skurishin Vladislav
 */
public interface StatusFactory
{
    /**
     * @return json object that contains success authentication status.
     */
    AuthenticationStatus successAuthenticationStatus();

    /**
     * @return json object that contains failure authentication status
     * and exception or error message.
     */
    AuthenticationStatus failureAuthenticationStatus(String message);

    /**
     * @return json object that contains success authentication status and id of profile.
     */
    AuthenticationStatus profileStatus(String username, long id);

    /**
     * @return json object that contains success authentication status and id of profile.
     */
    AuthenticationStatus profileStatus(Authentication authentication);
}
