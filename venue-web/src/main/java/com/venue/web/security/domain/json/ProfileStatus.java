package com.venue.web.security.domain.json;

/**
 * package: com.venue.web.security.domain.json
 * date: 01.06.14
 *
 * @author Skurishin Vladislav
 */
public class ProfileStatus extends AuthenticationStatus
{
    private final long id;

    public ProfileStatus(boolean signedIn, String username, long id)
    {
        super(signedIn, username, true);
        this.id = id;
    }

    public long getId()
    {
        return id;
    }
}
