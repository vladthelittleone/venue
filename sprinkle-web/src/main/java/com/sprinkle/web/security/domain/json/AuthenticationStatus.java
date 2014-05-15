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
    private final String username;

    public AuthenticationStatus(boolean signedIn, String username) {
        this.signedIn = signedIn;
        this.username = username;
    }

    public boolean isSignedIn() {
        return signedIn;
    }

    public String getUsername() {
        return username;
    }
}
