'use strict';

/**
 * Created by vladthelittleone on 01.11.14.
 */
angular.module('venue.services')

    /**
     * Service that responding for web storage.
     */
    .factory('$storage', function () {

        /**
         * Private function that return storage. If web storage not supported, then
         * return custom storage with array. Also resolve issue with private mode.
         */
        function initializeStorage(type) {

            // Check storage support.
            try {

                type.setItem("storage", "");

                type.removeItem("storage");

                return type;

            }
            catch (e) {

                // Custom storage.
                return {

                    s: {},

                    setItem: function (key, value) {

                        this.s[key] = value;

                    },

                    getItem: function (key) {

                        if (typeof this.s[key] != 'undefined') {

                            return this.s[key];

                        }
                        else {

                            return null;

                        }

                    },

                    removeItem: function (key) {

                        this.s[key] = undefined;

                    },

                    clear: function () {

                        this.s.length = 0;

                    }

                };

            }

        }

        return {

            /**
             * Local storage.
             */
            local: initializeStorage(localStorage),

            /**
             * Session storage.
             */
            session: initializeStorage(sessionStorage)

        }

    });