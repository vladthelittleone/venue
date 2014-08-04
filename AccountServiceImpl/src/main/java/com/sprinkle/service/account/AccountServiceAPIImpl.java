package com.sprinkle.service.account;


import com.sprinkle.service.account.ao.AccountFacade;
import shared.sprinkle.service.account.Account;
import shared.sprinkle.service.account.AccountServiceAPI;


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
    public Account addAccount(String email, String name, String surname, String password)
    {
        RequestValidator.validateCreationParams(email, name, surname, password);
        return accountAO.addAccount(email, name, surname, password);
    }


    @Override
    public Account getAccount(String email)
    {
        RequestValidator.validateGettingParams(email);
        return accountAO.getAccount(email);
    }

}
