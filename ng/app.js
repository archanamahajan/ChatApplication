var app = angular.module('chatapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "template/login.html",
            controller: "loginCtrl"
        })
        
        .state('chat', {
            url: "/chat/:username",
            templateUrl: "template/chat.html",
            controller: "chatCtrl"
        });
        
        $urlRouterProvider.otherwise("/login");
});