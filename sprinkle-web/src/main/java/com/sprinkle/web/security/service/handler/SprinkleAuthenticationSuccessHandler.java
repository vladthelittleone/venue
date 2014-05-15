package com.sprinkle.web.security.service.handler;

import com.sprinkle.web.security.domain.json.AuthenticationStatus;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

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
public class SprinkleAuthenticationSuccessHandler implements AuthenticationSuccessHandler
{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws ServletException, IOException
    {
        AuthenticationStatus status = new AuthenticationStatus(authentication.isAuthenticated(), authentication.getName());
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
