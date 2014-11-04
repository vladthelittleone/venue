package com.venue.web.security.service.handler;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venue.web.security.domain.json.AuthenticationStatus;
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
    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication)
            throws IOException, ServletException
    {
        AuthenticationStatus status = new AuthenticationStatus(false, null, true);
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
