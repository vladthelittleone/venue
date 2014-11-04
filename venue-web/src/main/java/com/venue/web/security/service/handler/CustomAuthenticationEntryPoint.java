package com.venue.web.security.service.handler;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venue.web.security.domain.json.AuthenticationStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

/**
 * package: com.venue.web.security.service.handler
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint
{
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException auth)
            throws IOException, ServletException
    {
        AuthenticationStatus status = new AuthenticationStatus(false, null, auth.getMessage(), false);
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
