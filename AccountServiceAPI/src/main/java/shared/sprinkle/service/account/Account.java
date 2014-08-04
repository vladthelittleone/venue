package shared.sprinkle.service.account;


import java.io.Serializable;


public class Account implements Serializable
{
    private static final long serialVersionUID = -2884667369231793614L;

    private Long id;

    private String email;

    private String name;

    private String surname;

    private String password;


    /**
     * @param id - уникальный идентификатор пользователя
     * @param email - адрес электронной почты пользователя
     * @param name - имя пользователя
     * @param surname - фамилия пользователя
     * @param password - пароль в захэшированном виде
     */
    protected Account(Long id, String email, String name, String surname, String password)
    {
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
    }


    /**
     * @return уникальный номер аккаунта
     */
    public Long getId()
    {
        return id;
    }

    /**
     * @return email на который зарегистрирован аккаунт
     */
    public String getEmail()
    {
        return email;
    }


    /**
     * @return имя пользователя
     */
    public String getName()
    {
        return name;
    }

    /**
     * @return фамилию пользователя
     */
    public String getSurname()
    {
        return surname;
    }

    /**
     * @return пароль пользователя в зашифрованном виде
     */
    public String getPassword()
    {
        return password;
    }
}
