package com.sprinkle.web.security.domain.json;

/**
 * package: com.sprinkle.web.security.domain.json
 * date: 01.06.14
 *
 * @author Skurishin Vladislav
 */
public class ProfileStatus extends AuthenticationStatus
{
    private final long id;

    public ProfileStatus(boolean signedIn, String email, long id)
    {
        super(signedIn, email, true);
        this.id = id;
    }

    public long getId()
    {
        return id;
    }
}
