package com.sprinkle.web.security.service.handler;

import com.sprinkle.web.security.domain.json.AuthenticationStatus;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

/**
 * package: com.sprinkle.web.security.service.handler
 * date: 14.05.14
 *
 * @author Skurishin Vladislav
 */
public class SprinkleAuthenticationEntryPoint implements AuthenticationEntryPoint
{
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
            throws IOException, ServletException
    {
        AuthenticationStatus status = new AuthenticationStatus(false, null);
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
