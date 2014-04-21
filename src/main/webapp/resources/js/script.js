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

function signIn() {
    var user = $("#login").val();
    var pwd = $("#password").val();
    if (user == "" || pwd == "") {
        $(".sign-in-container").shake(2, 9, 450);
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
                $("#btn-sign-up").addClass("hidden").removeClass("show");
                $("#btn-log-out").addClass("show").removeClass("hidden");
                $(".sign-in-container").addClass("hidden").removeClass("show");
            },
            401: function (response) {
                $("#btn-sign-up").addClass("show").removeClass("hidden");
                $("#login").val("");
                $("#password").val("");
            }
        }
    });
}