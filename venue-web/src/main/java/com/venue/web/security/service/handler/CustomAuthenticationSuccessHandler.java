package com.venue.web.security.service.handler;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venue.web.security.domain.factory.AuthenticationStatus;
import com.venue.web.security.domain.factory.StatusFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private StatusFactory statusFactory;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws ServletException, IOException
    {
        AuthenticationStatus status = statusFactory.profileStatus(authentication);
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
