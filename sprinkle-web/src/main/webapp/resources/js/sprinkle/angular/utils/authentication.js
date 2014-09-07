/**
* Created by vladthelittleone on 08.06.14.
*/
/**
 * Class thar responding for authentication alert.
 * @param sign - {@link Authentication}
 * @constructor
 */
function AuthenticationAlert(sign) {
    this.show = false;
    this.message = "";

    /**
     * Fields responding for incorrect inputs.
     * @type {boolean}
     */
    this.invalidPassword = false;
    this.invalidFullName = false;
    this.invalidEmail = false;

    /**
     * Alert warning.
     * @param message - warning message.
     * @param invalidEmail - true - email invalid / false - email valid
     * @param invalidPassword - true - password invalid / false - password valid
     * @param invalidFullName - true - full name invalid / false - full name valid
     */
    this.alertWarning = function (message, invalidEmail, invalidPassword, invalidFullName) {
        this.change(message, true);

        this.invalidPassword = invalidPassword;
        this.invalidEmail = invalidEmail;
        this.invalidFullName = invalidFullName;
    };

    this.alertMessage = function (msg) {
        this.change(msg, true);
        this.invalidEmail = true;
        this.invalidPassword = true;
    };


    /**
     * Change alert state.
     * @param message - message that will be shown.
     * @param show - true - show alert / false - don't.
     */
    this.change = function (message, show) {
        this.show = show;
        this.message = message;
        this.invalidPassword = false;
        this.invalidFullName = false;
        this.invalidEmail = false;
        sign.reset();
    };
}

function Authentication() {
    this.rememberMe = false;

    /**
     * Fields contains input information.
     * @type {string}
     */
    this.email = '';
    this.password = '';
    this.passwordCheck = '';
    this.fullName = '';

    /**
     * Remember-me toggle.
     */
    this.switchRememberMe = function () {
        this.rememberMe = !this.rememberMe;
    };

    /**
     * Set fields of authentication form empty.
     */
    this.reset = function () {
        this.email = '';
        this.password = '';
        this.passwordCheck = '';
        this.fullName = '';
    };
}