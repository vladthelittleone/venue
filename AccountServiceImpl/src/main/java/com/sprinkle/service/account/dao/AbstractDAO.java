package com.sprinkle.service.account.dao;


import org.springframework.jdbc.core.JdbcTemplate;


public class AbstractDAO
{
    private JdbcTemplate jt;


    public JdbcTemplate getJdbcTemplate()
    {
        return jt;
    }


    public void setJdbcTemplate(JdbcTemplate jt)
    {
        this.jt = jt;
    }


    protected long getNextValLong(String sequenceName)
    {
        return jt.queryForObject("SELECT " + sequenceName + ".NEXTVAL from dual", Long.class);
    }
}
