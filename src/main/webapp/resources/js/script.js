/**
 * Created by vladthelittleone on 21.04.14.
 */
jQuery.fn.shake = function (intShakes, intDistance, intDuration) {
    this.each(function () {
        $(this).css("position", "relative");
        for (var x = 1; x <= intShakes; x++) {
            $(this).animate({
                left: (intDistance * -1)
            }, (((intDuration / intShakes) / 4)))
                .animate({
                    left: intDistance
                }, ((intDuration / intShakes) / 2))
                .animate({
                    left: 0
                }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
};

function sprinkleLogin() {
    var user = $("#login").val();
    var pwd = $("#password").val();
    if (user == "" || pwd == "") {
        $("#login-form").shake(3, 7, 400);
        return;
    }

    $.ajax({
        type: "POST",
        url: "j_spring_security_check",
        data: {
            j_username: user,
            j_password: pwd
        },
        statusCode: {
            200: function (response) {
                $("#login-form").addClass("hidden").removeClass("show");
            },
            401: function (response) {
                $("#login").val("");
                $("#password").val("");
            }
        }
    });
}