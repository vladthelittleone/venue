package com.sprinkle.service.account.dao.oracle;


import com.sprinkle.service.account.AccountBuilder;
import com.sprinkle.service.account.ao.AccountFacade;
import com.sprinkle.service.account.dao.AbstractDAO;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.transaction.annotation.Transactional;
import shared.sprinkle.service.account.Account;

import java.sql.ResultSet;
import java.sql.SQLException;


public class AccountDAOOracle extends AbstractDAO implements AccountFacade
{
    private final static String ACCOUNT_SEQUENCE = "seq_accounts";


    @Override
    @Transactional
    public Account addAccount(String email, String name, String surname, String password)
    {
        if(getAccount(email) != null)
        {
            return null;
        }
        
        String SQL = "INSERT INTO account (id, email, name, surname, password) VALUES (?, ?, ?, ?, ?)";

        long id = getNextValLong(ACCOUNT_SEQUENCE);

        getJdbcTemplate().update(SQL, id, email, name, surname, password);

        return AccountBuilder.newBuilder(id, email, name, surname, password);
    }


    @Override
    @Transactional
    public Account getAccount(final String email)
    {
        String SQL = "SELECT id, name, surname, password FROM account WHERE email = ?";

        class AccountFind implements RowCallbackHandler
        {
            protected Account account = null;


            @Override
            public void processRow(ResultSet rs) throws SQLException
            {
                account = AccountBuilder.newBuilder(rs.getLong("id"), email, rs.getString("name"),
                        rs.getString("surname"), rs.getString("password")).build();

            }
        }

        AccountFind af = new AccountFind();
        getJdbcTemplate().query(SQL, af, email);

        return af.account;
    }

}
