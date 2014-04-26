/**
 * Created by vladthelittleone on 21.04.14.
 */

    // ---------------- JQuery objects

$.fn.shake = function (intShakes, intDistance, intDuration) {
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

$.fn.showMe = function () {
    $(this).addClass("show").removeClass("hidden");
};

$.fn.hideMe = function () {
    $(this).addClass("hidden").removeClass("show");
};

    // ---------------- History API

$(function() {

    // looking for all the links and hang on the event, all references in this document
    $(document).on('click', 'a.ajax-link', function() {
        // keep the link in the browser history
        history.pushState(null, null, this.href);


        // here can cause data loading, etc.


        // do not give a default action
        return false;
    });

    // hang on popstate event triggered by pressing back/forward in browser
    $(window).on('popstate', function(e) {

        // we get a normal Location object

        /*
         * Note, this is the only difference when using this library,
         * because the object document.location cannot be overriden,
         * so library the returns generated "location" object within
         * an object window.history, so get it out of "history.location".
         * For browsers supporting "history.pushState" get generated
         * object "location" with the usual "document.location".
         */
        var loc = history.location || document.location;

        // here can cause data loading, etc.

        });
});

$(document).ready(function () {

    // ---------------- Event Listeners

    $(document).on('click','#sign-in-button', function(e) {
        e.preventDefault();
        signIn();
    });

    $(document).on('click','#btn-sign-up', function(e) {
        e.preventDefault();
        $("#sign-in-container").hideMe();
    });
});

    // ---------------- Custom functions

function signIn() {

    var user = $("#login").val();
    var pwd = $("#password").val();
    if (user == "" || pwd == "") {
        $("#sign-in-container").shake(2, 7, 450);
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
                $("#btn-sign-up").hideMe();
                $("#btn-log-out").showMe();
                $("#sign-in-container").hideMe();
            },
            401: function (response) {
                $("#btn-sign-up").showMe();
                $("#sign-in-alert").showMe();
                $("#alert-text").html("<strong>Warning!</strong> Invalid e-mail address or password.");

                $("#sign-in-container").shake(2, 9, 450);

                $("#login").val("");
                $("#password").val("");
            }
        }
    });
}

