'use strict';

/**
 * Created by vladthelittleone on 22.09.14.
 * Initialization of venue.controllers.
 */
angular.module('venue.services', [])

    /**
     * Service that contains animation functions.
     */
    .factory('$animation', [ '$animate',

         function ($animate) {

             return {

                 /**
                  * Add css class to element, and remove by delay.
                  */
                 animation: function (elementName, animationName) {

                     $animate.addClass(jQuery(elementName), animationName, function () {

                         $animate.removeClass(jQuery(elementName), animationName);

                     });

                 },

                 /**
                  * Shake elements with class .content.
                  * @see controllers/authentication
                  */
                 authenticationShake: function () {

                     this.animation(".content", 'shake');

                 }

             };

         }

    ]);
