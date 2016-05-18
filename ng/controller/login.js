angular.module('chatapp')
    .controller('loginCtrl', function($scope, $state){
        $scope.submitted = false;
        $scope.doLogin = function () {
            $scope.submitted = true;
            if ($scope.loginPage.$valid) {
                $state.go('chat', {username: $scope.username});
            } 
        }
    });
    
