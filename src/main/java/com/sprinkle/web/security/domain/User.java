package com.sprinkle.web.security.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;

/**
 * package: com.sprinkle.web.security.domain
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
public class User implements UserDetails
{
    private static final long serialVersionUID = 8266525488057072269L;
    private String username;
    private String password;
    private Collection<GrantedAuthority> authorities;

    public User(String username, String password, String roles)
    {
        super();
        this.username = username;
        this.password = password;
        this.setRoles(roles);
    }

    public void setRoles(String roles)
    {
        this.authorities = new HashSet<>();
        for (final String role : roles.split(",")) {
            if (role != null && !"".equals(role.trim())) {
                GrantedAuthority grandAuthority = new GrantedAuthority()
                {
                    private static final long serialVersionUID = 3958183417696804555L;

                    @Override
                    public String getAuthority()
                    {
                        return role.trim();
                    }
                };
                this.authorities.add(grandAuthority);
            }
        }
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return this.authorities;
    }

    @Override
    public String getPassword()
    {
        return password;
    }

    @Override
    public String getUsername()
    {
        return username;
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
}

