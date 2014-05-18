package com.sprinkle.web.security.domain.json;

/**
 * package: com.sprinkle.web.security.domain
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class AuthenticationStatus
{
    private final boolean signedIn;
    private final boolean success;
    private final String username;

    public AuthenticationStatus(boolean signedIn, String username, boolean success) {
        this.signedIn = signedIn;
        this.username = username;
        this.success = success;
    }

    public boolean isSignedIn() {
        return signedIn;
    }

    public String getUsername() {
        return username;
    }

    public boolean isSuccess()
    {
        return success;
    }
}
