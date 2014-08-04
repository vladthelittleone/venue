package com.sprinkle.service.account;


import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;


public class RequestValidator
{

    public static void validateCreationParams(String email, String name, String surname, String password)
    {
        Preconditions.checkArgument(EmailValidator.getInstance().isValid(email), "Invalid email format");
        Preconditions.checkArgument(!StringUtils.isBlank(name), "Name cannot be empty");
        Preconditions.checkArgument(!StringUtils.isBlank(surname), "Surname cannot be empty");
        Preconditions.checkArgument(!StringUtils.isBlank(password), "Hashed password cannot be empty");
    }


    public static void validateGettingParams(String email)
    {
        Preconditions.checkArgument(EmailValidator.getInstance().isValid(email), "Invalid email format");
    }
}
