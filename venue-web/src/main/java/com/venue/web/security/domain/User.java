package com.venue.web.security.domain;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * package: com.venue.web.security.domain
 * date: 20.04.14
 *
 * @author Skurishin Vladislav
 */
public class User implements UserDetails
{
    private static final long serialVersionUID = 8266525488057072269L;
    private long id;
    private String username;
    private String password;
    private String fullname;
    private Collection<GrantedAuthority> authorities;

    public User(long id, String username, String password, String fullname, String roles)
    {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.setRoles(roles);
    }

    public void setRoles(String roles)
    {
        authorities = new HashSet<>();
        for (final String role : roles.split(","))
        {
            if (role != null && !"".equals(role.trim()))
            {
                GrantedAuthority grandAuthority = new SimpleGrantedAuthority(role.trim());
                authorities.add(grandAuthority);
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

    public void setId(long id)
    {
        this.id = id;
    }

    public void setFullname(String fullname)
    {
        this.fullname = fullname;
    }

    public long getId()
    {
        return id;
    }

    public String getFullname()
    {
        return fullname;
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

    @Override
    public String toString()
    {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", fullname='" + fullname + '\'' +
                ", authorities=" + authorities +
                '}';
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != user.id) return false;
        if (authorities != null ? !authorities.equals(user.authorities) : user.authorities != null) return false;
        if (fullname != null ? !fullname.equals(user.fullname) : user.fullname != null) return false;
        if (password != null ? !password.equals(user.password) : user.password != null) return false;
        if (username != null ? !username.equals(user.username) : user.username != null) return false;

        return true;
    }

    @Override
    public int hashCode()
    {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (fullname != null ? fullname.hashCode() : 0);
        result = 31 * result + (authorities != null ? authorities.hashCode() : 0);
        return result;
    }
}

