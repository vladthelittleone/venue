
//    // ---------------- History API
//
//$(function() {
//
//    // looking for all the links and hang on the event, all references in this document
//    $(document).on('click', 'a.ajax-link', function() {
//        // keep the link in the browser history
//        history.pushState(null, null, this.href);
//
//
//        // here can cause data loading, etc.
//
//
//        // do not give a default action
//        return false;
//    });
//
//    // hang on popstate event triggered by pressing back/forward in browser
//    $(window).on('popstate', function(e) {
//
//        // we get a normal Location object
//
//        /*
//         * Note, this is the only difference when using this library,
//         * because the object document.location cannot be overriden,
//         * so library the returns generated "location" object within
//         * an object window.history, so get it out of "history.location".
//         * For browsers supporting "history.pushState" get generated
//         * object "location" with the usual "document.location".
//         */
//        var loc = history.location || document.location;
//
//        // here can cause data loading, etc.
//
//        });
//});
//
//$(document).ready(function () {
//

// TODO put into directives.

// ---------------- JQuery shake
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

// ---------------- Button-checkbox style
// TODO
// переделать с JQuery(smt) на $scope, $apply
function checkboxStyle() {
    jQuery('.button-checkbox').each(function () {

        // Settings
        var $widget = jQuery(this),
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
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }

        init();
    });
}