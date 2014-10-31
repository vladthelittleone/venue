package com.venue.web.common.exception;

/**
 * package: com.venue.web.service.settings
 * date: 23.07.14
 *
 * @author Skurishin Vladislav
 */
public class IllegalEventProperties extends Exception
{
    public IllegalEventProperties()
    {
    }

    public IllegalEventProperties(String message)
    {
        super(message);
    }

    public IllegalEventProperties(String message, Throwable cause)
    {
        super(message, cause);
    }

    public IllegalEventProperties(Throwable cause)
    {
        super(cause);
    }

    public IllegalEventProperties(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
