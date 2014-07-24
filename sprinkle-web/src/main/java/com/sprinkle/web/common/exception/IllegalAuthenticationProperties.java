package com.sprinkle.web.common.exception;

/**
 * package: com.sprinkle.web.common.exception
 * date: 24.07.14
 *
 * @author Skurishin Vladislav
 */
public class IllegalAuthenticationProperties extends Exception
{
    public IllegalAuthenticationProperties()
    {
    }

    public IllegalAuthenticationProperties(String message)
    {
        super(message);
    }

    public IllegalAuthenticationProperties(String message, Throwable cause)
    {
        super(message, cause);
    }

    public IllegalAuthenticationProperties(Throwable cause)
    {
        super(cause);
    }

    public IllegalAuthenticationProperties(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
