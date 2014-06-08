/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Profile controller that handle information, events related
     * with profile configurations.
     * @controller
     */
    .controller('profileCtrl', ['$scope', '$profile',
        function ($scope, $profile) {
            $scope.profileService = $profile;
        }
    ]);