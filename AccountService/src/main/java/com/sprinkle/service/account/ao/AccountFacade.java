package com.sprinkle.service.account.ao;


import shared.sprinkle.service.account.Account;


public interface AccountFacade
{
    /**
     * Добавляет новый аккаунт в хранилище
     * 
     * @param email - адрес электронной почты пользователя
     * @param name - имя пользователя
     * @param surname - фамилия пользователя
     * @param password - пароль от аккаунта в захэшированном виде.
     * @return зарегистрированный {@code Account} или null, если аккаунт с таким email уже зарегистрирован.
     */
    public Account addAccount(String email, String name, String surname, String password);
    
    
    /**
     * Вытаскивает из хранилища всю информацию о зарегистрированном в системе пользователе
     * 
     * @param email - адрес электронной почты пользователя
     * @return {@code Account} аккаунт соответствующий введенным данным
     */
    public Account getAccount(String email);
}
