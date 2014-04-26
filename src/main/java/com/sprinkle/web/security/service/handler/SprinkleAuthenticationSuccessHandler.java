package com.sprinkle.web.security.service.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SprinkleAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler
{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws ServletException, IOException
    {
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
