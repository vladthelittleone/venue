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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

/**
 * package: com.venue.web.security.service.handler
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler
{
    @Autowired
    private StatusFactory statusFactory;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException auth)
            throws IOException, ServletException
    {
        AuthenticationStatus status = statusFactory.failureAuthenticationStatus(auth.getMessage());
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
