package com.venue.web.security.domain.json;

import com.venue.web.security.domain.User;
import org.springframework.security.core.Authentication;

/**
 * package: com.venue.web.security.domain.json
 * date: 01.06.14
 *
 * @author Skurishin Vladislav
 */
public class ProfileStatusCustom extends CustomAuthenticationStatus
{
    private final long id;

    public ProfileStatusCustom(boolean signedIn, String username, long id)
    {
        super(signedIn, username, true);
        this.id = id;
    }

    public ProfileStatusCustom(Authentication authentication)
    {
        super(authentication.isAuthenticated(), authentication.getName(), true);
        this.id = ((User) authentication.getPrincipal()).getId();
    }

    public long getId()
    {
        return id;
    }
}
