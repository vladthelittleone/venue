package com.sprinkle.service.account.ao;


import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import shared.sprinkle.service.account.Account;
import shared.sprinkle.service.account.exception.AccountManagmentException;


/**
 * Обертка над persistance storage, позволяющая хранить аккаунты в памяти и осуществлять быстрый доступ к ним
 * 
 * @author dmitry
 * 
 */
public class AccountFacadeImpl implements AccountFacade
{

    @Autowired
    private Ehcache cache;

    private AccountFacade dao;


    /**
     * @param dao - persistence storage
     */
    public AccountFacadeImpl(AccountFacade dao)
    {
        this.dao = dao;
    }


    @Override
    public Account addAccount(String email, String name, String surname, String password)
            throws AccountManagmentException
    {
        cache.acquireWriteLockOnKey(email);

        try
        {
            if (getAccount(email) != null)
            {
                throw new AccountManagmentException("This email already registered");
            }

            Account newAccount = dao.addAccount(email, name, surname, password);

            cache.put(new Element(email, newAccount));

            return newAccount;
        }
        finally
        {
            cache.releaseWriteLockOnKey(email);
        }
    }


    @Override
    public Account getAccount(String email)
    {
        Element element = cache.get(email);

        if (element != null)
            return (Account) element.getObjectValue();

        cache.acquireWriteLockOnKey(email);

        try
        {
            element = cache.get(email);

            if (element == null)
            {
                Account account = dao.getAccount(email);

                if (account == null)
                    return null;

                element = new Element(email, account);

                cache.put(element);
            }

            return (Account) element.getObjectValue();
        }
        finally
        {
            cache.releaseWriteLockOnKey(email);
        }
    }

}
