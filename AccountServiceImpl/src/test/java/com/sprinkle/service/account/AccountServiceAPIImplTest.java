package com.sprinkle.service.account;


import org.apache.commons.lang3.StringUtils;
import com.sprinkle.service.account.ao.AccountFacade;
import org.junit.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

/**
 * Тестирование реализации апи и валидации приходящих параметров
 * 
 * @author Cheprasov Dmitry
 */
public class AccountServiceAPIImplTest
{
    AccountFacade ao = mock(AccountFacade.class);

    AccountServiceAPIImpl api = new AccountServiceAPIImpl(ao);


    @Test
    public void gettingParamsCorrect()
    {
        String email = "testmail123@gmail.com";
        when(ao.getAccount(email)).thenReturn(
                AccountBuilder.newBuilder(1l, email, "Ivan", "Ivanov", "hashedPassword").build());
        api.getAccount(email);
        verify(ao, times(1)).getAccount(email);
    }


    @Test(expected = IllegalArgumentException.class)
    public void gettingParamsIncorrectEmail()
    {
        String email = "incorrectEmailFormat";
        api.getAccount(email);
    }


    @Test
    public void creationParamsCorrect()
    {
        String email = "test@mail.ru";
        String name = "Ivan";
        String surname = "Ivanov";
        String password = "hashedPassword";
        when(api.addAccount(email, name, surname, password)).thenReturn(
                AccountBuilder.newBuilder(1l, email, name, surname, password).build());
        api.addAccount(email, name, surname, password);
        verify(ao, times(1)).addAccount(email, name, surname, password);
    }


    @Test(expected = IllegalArgumentException.class)
    public void creationParamsIncorrectEmail()
    {
        String email = "incorrectEmailFormat";
        String name = "Ivan";
        String surname = "Ivanov";
        String password = "hashedPassword";
        api.addAccount(email, name, surname, password);
    }

    @Test(expected = IllegalArgumentException.class)
    public void creationParamsIncorrectName()
    {
        String email = "testmail123@gmail.com";
        String name = StringUtils.EMPTY;
        String surname = "Ivanov";
        String password = "hashedPassword";
        api.addAccount(email, name, surname, password);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void creationParamsIncorrectSurname()
    {
        String email = "testmail123@gmail.com";
        String name = "Ivan";
        String surname = StringUtils.EMPTY;
        String password = "hashedPassword";
        api.addAccount(email, name, surname, password);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void creationParamsIncorrectPassword()
    {
        String email = "testmail123@gmail.com";
        String name = "Ivan";
        String surname = "Ivanov";
        String password = StringUtils.EMPTY;
        api.addAccount(email, name, surname, password);
    }
}
