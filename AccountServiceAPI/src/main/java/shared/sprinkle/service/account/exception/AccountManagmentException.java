package shared.sprinkle.service.account.exception;

/**
 * Created by dmitry on 18.07.14.
 */
public class AccountManagmentException extends Exception
{
    private static final long serialVersionUID = 3948401202757500100L;

    public AccountManagmentException()
    {
        super();
    }

    public AccountManagmentException(String message)
    {
        super(message);
    }

    public AccountManagmentException(String message, Throwable cause)
    {
        super(message, cause);
    }
}
