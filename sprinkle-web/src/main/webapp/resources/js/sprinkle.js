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

        // hide warnings and sign-input-error style
        $("#sign-alert").hideMe();
        $(".sign-input-error").addClass("sign-input").removeClass("sign-input-error");

        signIn();
    });

    $(document).on('click','#sign-up-button', function(e) {
        e.preventDefault();

        // hide warnings and sign-input-error style
        $("#sign-alert").hideMe();
        $(".sign-input-error").addClass("sign-input").removeClass("sign-input-error");

        signUp();
    });

    $(document).on('click','#btn-sign-up', function(e) {
        e.preventDefault();

        $(".sign-up").showMe();
        $(".sign-in").hideMe();

        // hide sign-input-error style
        $("#sign-alert").hideMe();
        $(".sign-input-error").addClass("sign-input").removeClass("sign-input-error");
    });

    $(document).on('click','#btn-sign-in', function(e) {
        e.preventDefault();

        $(".sign-up").hideMe();
        $(".sign-in").showMe();

        // hide sign-input-error style
        $("#sign-alert").hideMe();
        $(".sign-input-error").addClass("sign-input").removeClass("sign-input-error");
    });

    $(document).on('click','#btn-logout', function(e) {
        e.preventDefault();

        $("#sign-container").showMe();
        $(".sign-in").showMe();

        // hide sign-input-error style
        $("#sign-alert").hideMe();
        $(".sign-input-error").addClass("sign-input").removeClass("sign-input-error");

        logout();
    });
});

// ---------------- Custom functions

function isValidEmailAddress(s) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    var emailAddress = $(s).val();

    if (!pattern.test(emailAddress)) {
        $("#sign-container").shake(3, 7, 400);
        $(s).val("").addClass("sign-input-error").removeClass("sign-input");
        signAlert("<strong>Warning!</strong> This e-mail address is not valid.");
        return false;
    }

    return emailAddress != "";
}

function signAlert(html) {
    $("#sign-alert").showMe();
    $("#alert-text").html(html);
}

function logout() {
    $.ajax({
        type: "GET",
        async: false,
        url: "logout",
        success: function () {
            history.pushState(null, null, "/");
            window.location.reload();
        }
    });
}

function signIn() {

    var email = $("#email").val();
    var pwd = $("#password").val();

    if (!isValidEmailAddress("#email") || pwd == "") {
        $("#sign-container").shake(2, 7, 450);
        return;
    }

    $.ajax({
        type: "POST",
        url: "j_spring_security_check",
        data: {
            j_username: email,
            j_password: pwd
        },
        statusCode: {
            200: function (response) {
                $("#btn-logout").showMe();

                $(".sign-in").hideMe();
                $(".sign-out").hideMe();
                $("#sign-container").hideMe();
            },
            401: function (response) {
                $(".sign-in").showMe();

                signAlert("<strong>Warning!</strong> Invalid e-mail address or password.");

                $("#sign-container").shake(2, 9, 450);

                $("#email").val("");
                $("#password").val("");
            }
        }
    });
}

function signUp() {

    if (!isValidEmailAddress("#email") || $("#password").val() == "" || $("#full-name").val() == "") {
        $("#sign-container").shake(3, 7, 400);
        return;
    }

    if($("#password").val() != $("#password-check").val()){
        $("#sign-container").shake(3, 7, 400);
        $("#password").val("").addClass("sign-input-error").removeClass("sign-input");
        $("#password-check").val("").addClass("sign-input-error").removeClass("sign-input");
        signAlert("<strong>Warning!</strong> Passwords don't match.");
        return;
    }

    $.ajax({
        type: "POST",
        async: false,
        url: "sprinkle/signup",
        data: {
            login: $("#email").val(),
            name: $("#full-name").val(),
            password: $("#password").val()
        },
        complete: function (xhr) {
            switch (xhr.status) {
                case 200:
                    $(".sign-up").hideMe();
                    $(".sign-in").showMe();
                    break;
                default:
                    $("#sign-container").shake(3, 7, 400);
                    signAlert("<strong>Warning!</strong> This e-mail is already registered.");
            }
        }
    });
}

// ---------------- Checkbox icon

$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});
