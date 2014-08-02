package com.sprinkle.service.account;


import org.springframework.util.StringUtils;
import shared.sprinkle.service.account.Account;


/**
 * Билдер для {@code Account}
 * 
 * @author dmitry
 */
public class AccountBuilder extends Account
{

    private static final long serialVersionUID = 8528131227829492593L;


    private AccountBuilder(long id, String email, String name, String surname, String password)
    {
        super(id, email, name, surname, password);
    }


    public static AccountBuilder newBuilder(long id, String email, String name, String surname, String password)
    {
        return new AccountBuilder(id, email, name, surname, password);
    }


    public static AccountBuilder inherit(Account account)
    {
        return new AccountBuilder(account.getId(), account.getEmail(), account.getName(), account.getSurname(),
                account.getPassword());
    }


    public Account build()
    {
        validate();
        return (Account) this;
    }


    private void validate()
    {
        if (getId() < 1)
        {
            throw new IllegalArgumentException("Incorrect user id. Id cannot be less than 1");
        }
        if (StringUtils.isEmpty(getEmail()))
        {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if(StringUtils.isEmpty(getName()))
        {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if(StringUtils.isEmpty(getSurname()))
        {
            throw new IllegalArgumentException("Surname cannot be empty");
        }
        if(StringUtils.isEmpty(getPassword()))
        {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        
    }

}
