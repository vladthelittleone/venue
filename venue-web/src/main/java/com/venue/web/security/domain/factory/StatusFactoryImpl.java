package com.venue.web.security.domain.factory;

import com.venue.web.security.domain.json.CustomAuthenticationStatus;
import com.venue.web.security.domain.json.ProfileStatusCustom;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * package: com.venue.web.security.domain.factory
 * date: 06.11.14
 *
 * @author Skurishin Vladislav
 */
@Service
public class StatusFactoryImpl implements StatusFactory
{
    @Override
    public CustomAuthenticationStatus successAuthenticationStatus()
    {
        return new CustomAuthenticationStatus(false, null, true);
    }

    @Override
    public CustomAuthenticationStatus failureAuthenticationStatus(String message)
    {
        return new CustomAuthenticationStatus(false, null, message, false);
    }

    @Override
    public ProfileStatusCustom profileStatus(String username, long id)
    {
        return new ProfileStatusCustom(true, username, id);
    }

    @Override
    public ProfileStatusCustom profileStatus(Authentication authentication)
    {
        return new ProfileStatusCustom(authentication);
    }
}
