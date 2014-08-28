/**
 * 
 */
package com.sprinkle.service.account.ao;


import com.sprinkle.service.account.AccountBuilder;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import org.junit.Before;
import org.junit.Test;
import shared.sprinkle.service.account.Account;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.reset;


/**
 * Тестирование фасада persistence storage.
 * 
 * @author Cheprasov Dmitry
 */
public class AccountFacadeImplTest
{
    AccountFacade dao = mock(AccountFacade.class);

    Ehcache cache;

    AccountFacadeImpl ao = new AccountFacadeImpl(dao);


    @Before
    public void before()
    {
        CacheManager cchm = CacheManager.getInstance();
        cchm.addCache("test");
        cache = cchm.getEhcache("test");

        ao.setCache(cache);
    }


    @Test
    public void testAO()
    {
        String email = "test@mail.ru";
        String name = "Ivan";
        String surname = "Ivanov";
        String password = "hashedPassword";

        //Проверяем, что в кэше нет аккаунта с таким email
        when(dao.getAccount(email)).thenReturn(null);
        assertEquals(null, ao.getAccount(email));
        verify(dao, times(1)).getAccount(email);

        reset(dao);
        
        //Заводим нового пользователя
        Account account = AccountBuilder.newBuilder(1l, email, name, surname, password).build();
        when(dao.addAccount(email, name, surname, password)).thenReturn(account);
        assertEquals(account, ao.addAccount(email, name, surname, password));
        verify(dao, times(1)).getAccount(email);
        verify(dao, times(1)).addAccount(email, name, surname, password);
        
        reset(dao);
        
        //Проверяем, что при запросе нового счета не задействован persistence storage
        assertEquals(account, ao.getAccount(email));
        verify(dao, never()).getAccount(email);
    }

}
