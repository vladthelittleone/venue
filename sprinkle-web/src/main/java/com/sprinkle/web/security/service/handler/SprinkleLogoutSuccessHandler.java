package com.sprinkle.web.security.service.handler;

import com.sprinkle.web.security.domain.json.AuthenticationStatus;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

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
public class SprinkleLogoutSuccessHandler implements LogoutSuccessHandler
{
    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication)
            throws IOException, ServletException
    {
        AuthenticationStatus status = new AuthenticationStatus(false, null);
        OutputStream out = response.getOutputStream();
        new ObjectMapper().writeValue(out, status);
    }
}
