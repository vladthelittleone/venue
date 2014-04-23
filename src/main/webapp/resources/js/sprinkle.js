/**
 * Created by vladthelittleone on 21.04.14.
 */

    // ---------------- JQuery объекты

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

    // ищем все ссылки и вешаем события на все ссылки в нашем документе
    $(document).on('click', 'a.ajax-link', function() {
        // заносим ссылку в историю
        history.pushState(null, null, this.href);

        // тут можете вызвать подгрузку данных и т.п.

        // не даем выполнить действие по умолчанию
        return false;
    });

    // вешаем событие на popstate которое срабатывает при нажатии back/forward в браузере
    $(window).on('popstate', function(e) {

        // получаем нормальный объект Location

        /*
         * заметьте, это единственная разница при работе с данной библиотекой,
         * так как объект document.location нельзя перезагрузить, поэтому
         * библиотека history возвращает сформированный "location" объект внутри
         * объекта window.history, поэтому получаем его из "history.location".
         * Для браузеров поддерживающих "history.pushState" получаем
         * сформированный объект "location" с обычного "document.location".
         */
        var loc = history.location || document.location;


        // тут можете вызвать подгрузку данных и т.п.

        });
});

$(document).ready(function () {

    // ---------------- Обработчики

    $(document).on('click','#sign-in-button', function(e) {
        e.preventDefault();
        signIn();
    });

    $(document).on('click','#btn-sign-up', function(e) {
        e.preventDefault();
        $("#sign-in-container").hideMe();
    });
});

    // ---------------- Кастомные функции

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

