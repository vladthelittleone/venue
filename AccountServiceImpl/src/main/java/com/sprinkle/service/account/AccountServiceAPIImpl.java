package com.sprinkle.service.account;


import com.sprinkle.service.account.ao.AccountFacade;
import shared.sprinkle.service.account.Account;
import shared.sprinkle.service.account.AccountServiceAPI;
import shared.sprinkle.service.account.exception.AccountManagmentException;


public class AccountServiceAPIImpl implements AccountServiceAPI
{
    private AccountFacade accountAO;

    /**
     * @param accountAO - хранилище аккаунтов
     */
    public AccountServiceAPIImpl(AccountFacade accountAO)
    {
        this.accountAO = accountAO;
    }


    @Override
    public Account addAccount(String email, String name, String surname, String password) throws AccountManagmentException {
        return accountAO.addAccount(email, name, surname, password);
    }


    @Override
    public Account getAccount(String email)
    {
        return accountAO.getAccount(email);
    }


    /**
     * For tests only!!!
     */
    public void setAccountAO(AccountFacade accountAO)
    {
        this.accountAO = accountAO;
    }

}
