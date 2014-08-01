package com.sprinkle.web.common.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.sprinkle.web.common.exception.IllegalAuthenticationProperties;

/**
 * package: com.sprinkle.web.common.setting
 * date: 25.07.14
 *
 * @author Skurishin Vladislav
 */
public class AuthenticationValidator
{
    private int passwordMaxLength;
    private int passwordMinLength;

    private EmailFormatValidator emailValidator = new EmailFormatValidator();

    public void validate(String username, String fullname, String password)
            throws IllegalAuthenticationProperties
    {
        if (username == null)
        {
            throw new IllegalAuthenticationProperties("Incorrect username, please try again");
        }

        if (username.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Username can not be empty, please try again");
        }

        if (password == null)
        {
            throw new IllegalAuthenticationProperties("Incorrect password, please try again");
        }

        if (password.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Password can not be empty, please try again");
        }

        if (fullname == null)
        {
            throw new IllegalAuthenticationProperties("Incorrect full name, please try again");
        }

        if (fullname.isEmpty())
        {
            throw new IllegalAuthenticationProperties("Full name can not be empty, please try again");
        }

        if (password.length() > passwordMaxLength)
        {
            throw new IllegalAuthenticationProperties(
                    String.format("Password length must be less then %d, please try again", passwordMaxLength));
        }

        if (password.length() < passwordMinLength)
        {
            throw new IllegalAuthenticationProperties(
                    String.format("Password length must be more then %d, please try again", passwordMinLength));
        }

        if (!emailValidator.validate(username))
        {
            throw new IllegalAuthenticationProperties("Invalid e-mail address, please try again");
        }
    }

    public int getPasswordMaxLength()
    {
        return passwordMaxLength;
    }

    public class EmailFormatValidator {

        private Pattern pattern;
        private Matcher matcher;

        private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

        public EmailFormatValidator() {
            pattern = Pattern.compile(EMAIL_PATTERN);
        }

        public boolean validate(final String email) {

            matcher = pattern.matcher(email);
            return matcher.matches();

        }
    }

    public void setPasswordMaxLength(int passwordMaxLength)
    {
        this.passwordMaxLength = passwordMaxLength;
    }

    public int getPasswordMinLength()
    {
        return passwordMinLength;
    }

    public void setPasswordMinLength(int passwordMinLength)
    {
        this.passwordMinLength = passwordMinLength;
    }
}
