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
    private final String message;

    public AuthenticationStatus(boolean signedIn, String username, String message, boolean success) {
        this.signedIn = signedIn;
        this.username = username;
        this.success = success;
        this.message = message;
    }

    public AuthenticationStatus(boolean signedIn, String username, boolean success) {
        this.signedIn = signedIn;
        this.username = username;
        this.success = success;
        this.message = "";
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

    public String getMessage()
    {
        return message;
    }
}
