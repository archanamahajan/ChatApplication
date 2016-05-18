angular.module('chatapp')
    .controller('chatCtrl', function($scope, $state, $timeout, $filter){
        console.log('in chatCtrl');
        //var socket = io.connect('http://localhost:3000');
        //var socket = io('http://localhost:3000');
        //var winHeight = $( window ).height();
        var msgJSON;
        $scope.uname = $state.params.username;
        //$('#chatWindow').height(winHeight - 80);
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
            console.log('disconnect');
            $scope.msgArray = [];
            socket.emit('disconnect');
            $state.go('login');
        }
        
        socket.on('message received', function (msg) {
            $timeout(function() {
                $scope.msgArray = [];
                console.log('msg : ', msg);
                $scope.msgArray = msg;
                console.log('$scope.msgArray : ', $scope.msgArray);
            }, 0);
        });
        
        socket.on('userConnected', function (data) {
            $timeout(function() {
                $scope.connectedUsers.push($scope.uname);
                console.log('in index.html on 123 : ',data);
                //$scope.statusMsg = $scope.uname + ' is connected to the chat';
                $scope.statusMsg = 'You can now chat';
                console.log('$scope.statusMsg : ', $scope.statusMsg); 
                
                socket.emit('show status', $scope.uname);
            }, 0);
        });
        
        socket.on('connected users list', function(users) {
            $timeout(function() {
                console.log('connected users list : ', users);
                //$scope.connectedUsers = [];
                $scope.connectedUsers = users;
            }, 0);
        });
        
    });