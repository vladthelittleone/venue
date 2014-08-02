package shared.sprinkle.service.account;


import shared.sprinkle.service.account.exception.AccountManagmentException;

public interface AccountServiceAPI
{
    /**
     * Регистрирует новый аккаунт в системе
     * 
     * @param email - адрес электронной почты пользователя
     * @param name - имя пользователя
     * @param surname - фамилия пользователя
     * @param password - пароль от аккаунта в захэшированном виде.
     * @return зарегистрированный {@code Account}
     * @throws AccountManagmentException - ошибка создания нового аккаунта
     */
    public Account addAccount(String email, String name, String surname, String password) throws AccountManagmentException;


    /**
     * Позволяет получить всю информацию о зарегистрированном в системе пользователе
     * 
     * @param email - адрес электронной почты пользователя
     * @return {@code Account} аккаунт соответствующий введенным данным
     */
    public Account getAccount(String email);
}
