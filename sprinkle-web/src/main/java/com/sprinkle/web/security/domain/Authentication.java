package com.sprinkle.web.security.domain;

/**
 * package: com.sprinkle.web.security.domain
 * date: 09.05.14
 *
 * @author Skurishin Vladislav
 */
public class Authentication
{
    private String username;
    private String password;
    private String fullname;

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getFullname()
    {
        return fullname;
    }

    public void setFullname(String fullname)
    {
        this.fullname = fullname;
    }
}
