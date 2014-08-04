package com.sprinkle.service.account;


import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;
import shared.sprinkle.service.account.Account;


/**
 * Билдер для {@code Account}
 * 
 * @author dmitry
 */
public class AccountBuilder extends Account
{

    private static final long serialVersionUID = 8528131227829492593L;


    private AccountBuilder(Long id, String email, String name, String surname, String password)
    {
        super(id, email, name, surname, password);
    }


    public static AccountBuilder newBuilder(Long id, String email, String name, String surname, String password)
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
        if (getId() == null)
        {
            throw new IllegalArgumentException("Incorrect user id. Id cannot be null");
        }
        if (getId() < 1)
        {
            throw new IllegalArgumentException("Incorrect user id. Id cannot be less than 1");
        }
        if (StringUtils.isBlank(getEmail()))
        {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (!EmailValidator.getInstance().isValid(getEmail()))
        {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (StringUtils.isBlank(getName()))
        {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (StringUtils.isBlank(getSurname()))
        {
            throw new IllegalArgumentException("Surname cannot be empty");
        }
        if (StringUtils.isBlank(getPassword()))
        {
            throw new IllegalArgumentException("Password cannot be empty");
        }

    }

}
