package com.sprinkle.web.common.validator;

import com.sprinkle.web.common.exception.IllegalAuthenticationProperties;

/**
 * package: com.sprinkle.web.common.setting
 * date: 25.07.14
 *
 * @author Skurishin Vladislav
 */
public class AuthenticationValidator
{
    private int passwordMaxLength;
    private int passwordMinLength;

    public void validate(final String username, final String fullname, final String password)
            throws IllegalAuthenticationProperties
    {
        if (username == null)
        {
            throw new IllegalAuthenticationProperties("Username can not be null");
        }

        if (username.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Username can not be empty");
        }

        if (password == null)
        {
            throw new IllegalAuthenticationProperties("Password can not be null");
        }

        if (password.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Password can not be empty");
        }

        if (fullname == null)
        {
            throw new IllegalAuthenticationProperties("Full name can not be null");
        }

        if (fullname.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Full name can not be empty");
        }

        if (password.length() > getPasswordMaxLength())
        {
            throw new IllegalAuthenticationProperties("Password length more then service max length");
        }

        if (password.length() < getPasswordMinLength())
        {
            throw new IllegalAuthenticationProperties("Password length less then service min length");
        }
    }

    public int getPasswordMaxLength()
    {
        return passwordMaxLength;
    }

    public void setPasswordMaxLength(int passwordMaxLength)
    {
        this.passwordMaxLength = passwordMaxLength;
    }

    public int getPasswordMinLength()
    {
        return passwordMinLength;
    }

    public void setPasswordMinLength(int passwordMinLength)
    {
        this.passwordMinLength = passwordMinLength;
    }
}
