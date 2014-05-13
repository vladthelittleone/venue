package com.sprinkle.web.security.domain.json;

/**
 * package: com.sprinkle.web.security.domain
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class SignInStatus
{
    private final boolean signedIn;
    private final String username;

    public SignInStatus(boolean signedIn, String username) {
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
