angular.module('chatapp')
    .controller('loginCtrl', function($scope, $state){
        console.log('in login controller');
        $scope.submitted = false;
        $scope.doLogin = function () {
            console.log('in login function');
            console.log('$scope.loginPage.$valid : ', $scope.loginPage.$valid);
            $scope.submitted = true;
            if ($scope.loginPage.$valid) {
                console.log('$scope.username : ', $scope.username);
                $state.go('chat', {username: $scope.username});
            } 
        }
    });
    