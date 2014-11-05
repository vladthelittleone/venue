package com.venue.web.security.domain.json;

import com.venue.web.security.domain.factory.AuthenticationStatus;

/**
 * package: com.venue.web.security.domain
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class CustomAuthenticationStatus implements AuthenticationStatus
{
    private final boolean signedIn;
    private final boolean success;
    private final String username;
    private final String message;

    public CustomAuthenticationStatus(boolean signedIn, String username, String message, boolean success)
    {
        this.signedIn = signedIn;
        this.username = username;
        this.success = success;
        this.message = formatString(message);
    }

    public CustomAuthenticationStatus(boolean signedIn, String username, boolean success)
    {
        this.signedIn = signedIn;
        this.username = username;
        this.success = success;
        this.message = "";
    }

    public boolean isSignedIn()
    {
        return signedIn;
    }

    public String getUsername()
    {
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

    private String formatString(String string)
    {
        return string + ".";
    }
}
