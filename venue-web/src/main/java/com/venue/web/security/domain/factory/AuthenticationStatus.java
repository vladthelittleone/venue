package com.venue.web.security.domain.factory;

/**
 * package: com.venue.web.security.domain.factory
 * date: 06.11.14
 *
 * @author Skurishin Vladislav
 */
public interface AuthenticationStatus
{
    boolean isSignedIn();

    boolean isSuccess();

    String getUsername();

    String getMessage();
}
