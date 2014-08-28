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
    private final String email;
    private final String message;

    public AuthenticationStatus(boolean signedIn, String email, String message, boolean success)
    {
        this.signedIn = signedIn;
        this.email = email;
        this.success = success;
        this.message = formatString(message);
    }

    public AuthenticationStatus(boolean signedIn, String email, boolean success)
    {
        this.signedIn = signedIn;
        this.email = email;
        this.success = success;
        this.message = "";
    }

    public boolean isSignedIn()
    {
        return signedIn;
    }

    public String getEmail()
    {
        return email;
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
        return new StringBuilder()
                .append(string)
                .append(".")
                .toString();
    }
}
