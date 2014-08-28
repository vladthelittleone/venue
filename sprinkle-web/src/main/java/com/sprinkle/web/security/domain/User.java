package com.sprinkle.web.security.domain;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;

import org.apache.commons.lang.StringUtils;
import shared.sprinkle.service.account.Account;


/**
 * package: com.sprinkle.web.security.domain date: 20.04.14
 * 
 * @author Skurishin Vladislav
 */
public class User implements UserDetails
{
    private static final long serialVersionUID = 8266525488057072269L;

    private long id;

    private String email;

    private String name;

    private String surname;

    private String password;

    private Collection<GrantedAuthority> authorities;


    public User(Account account)
    {
        super();
        this.id = account.getId();
        this.email = account.getEmail();
        this.name = account.getName();
        this.surname = account.getSurname();
        this.password = account.getPassword();
        this.setRoles("ROLE_USER");
    }


    public void setRoles(String roles)
    {
        authorities = new HashSet<>();
        for (final String role : roles.split(","))
        {
            if (StringUtils.isNotBlank(role))
            {
                GrantedAuthority grandAuthority = new SimpleGrantedAuthority(role.trim());
                authorities.add(grandAuthority);
            }
        }
    }


    /**
     * @return the id
     */
    public long getId()
    {
        return id;
    }


    /**
     * @return the email
     */
    public String getEmail()
    {
        return email;
    }


    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }


    /**
     * @return the surname
     */
    public String getSurname()
    {
        return surname;
    }


    @Override
    public String getPassword()
    {
        return password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return this.authorities;
    }


    @Override
    public String getUsername()
    {
        return this.getEmail();
    }


    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }


    @Override
    public boolean isAccountNonLocked()
    {
        return true;
    }


    @Override
    public boolean isCredentialsNonExpired()
    {
        return true;
    }


    @Override
    public boolean isEnabled()
    {
        return true;
    }


    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((authorities == null) ? 0 : authorities.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((password == null) ? 0 : password.hashCode());
        result = prime * result + ((surname == null) ? 0 : surname.hashCode());
        return result;
    }


    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        if (authorities == null)
        {
            if (other.authorities != null)
                return false;
        }
        else if (!authorities.equals(other.authorities))
            return false;
        if (email == null)
        {
            if (other.email != null)
                return false;
        }
        else if (!email.equals(other.email))
            return false;
        if (id != other.id)
            return false;
        if (name == null)
        {
            if (other.name != null)
                return false;
        }
        else if (!name.equals(other.name))
            return false;
        if (password == null)
        {
            if (other.password != null)
                return false;
        }
        else if (!password.equals(other.password))
            return false;
        if (surname == null)
        {
            if (other.surname != null)
                return false;
        }
        else if (!surname.equals(other.surname))
            return false;
        return true;
    }


    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString()
    {
        return "User [id=" + id + ", email=" + email + ", name=" + name + ", surname=" + surname + ", authorities="
                + authorities + "]";
    }
}
