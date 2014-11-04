package com.venue.web.security.service.handler;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venue.web.security.domain.User;
import com.venue.web.security.domain.json.ProfileStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**
 * package: com.venue.web.security.service.handler
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler
{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws ServletException, IOException
    {
        ProfileStatus status = new ProfileStatus(authentication.isAuthenticated(), authentication.getName(), ((User) authentication.getPrincipal()).getId());
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
