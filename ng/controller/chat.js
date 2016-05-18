angular.module('chatapp')
    .controller('chatCtrl', function($scope, $state, $timeout, $filter){
        var msgJSON;
        $scope.uname = $state.params.username;
        var socket = io();
        $scope.msgArray = [];
        $scope.connectedUsers = [];
        $scope.sendMessage = function () {
            $timeout(function() {
                msgJSON = {
                    username: $scope.uname,
                    msg: $scope.message,
                    time: $filter('date')(new Date(), 'mediumTime')
                }
                $scope.msgArray.push(msgJSON);
                socket.emit('chat message', msgJSON);
                $scope.message = '';
            }, 0);
        }
        
        $scope.doEndChat = function () {
            $scope.msgArray = [];
            socket.emit('disconnect');
            $state.go('login');
        }
        
        socket.on('message received', function (msg) {
            $timeout(function() {
                $scope.msgArray = [];
                $scope.msgArray = msg;
            }, 0);
        });
        
        socket.on('userConnected', function (data) {
            $timeout(function() {
                $scope.connectedUsers.push($scope.uname);
                $scope.statusMsg = 'You can now chat';
                
                socket.emit('show status', $scope.uname);
            }, 0);
        });
        
        socket.on('connected users list', function(users) {
            $timeout(function() {
                $scope.connectedUsers = users;
            }, 0);
        });
        
    });
