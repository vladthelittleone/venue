package com.sprinkle.web.security.domain.json;


/**
 * package: com.sprinkle.web.security.domain date: 09.05.14
 * 
 * @author Skurishin Vladislav
 */
public class SignUpRequest
{
    private String email;

    private String password;

    private String name;

    private String surname;


    /**
     * @return the email
     */
    public String getEmail()
    {
        return email;
    }


    /**
     * @return the password
     */
    public String getPassword()
    {
        return password;
    }


    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }


    /**
     * @return the surname
     */
    public String getSurname()
    {
        return surname;
    }


    /**
     * @param email the email to set
     */
    public void setEmail(String email)
    {
        this.email = email;
    }


    /**
     * @param password the password to set
     */
    public void setPassword(String password)
    {
        this.password = password;
    }


    /**
     * @param name the name to set
     */
    public void setName(String name)
    {
        this.name = name;
    }


    /**
     * @param surname the surname to set
     */
    public void setSurname(String surname)
    {
        this.surname = surname;
    }

}
