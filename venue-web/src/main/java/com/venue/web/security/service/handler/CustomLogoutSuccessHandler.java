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
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

/**
 * package: com.venue.web.security.service.handler
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler
{
    @Autowired
    private StatusFactory statusFactory;

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication)
            throws IOException, ServletException
    {
        AuthenticationStatus status = statusFactory.successAuthenticationStatus();
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
