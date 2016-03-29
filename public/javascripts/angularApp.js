/**
 * Created by root on 28/3/16.
 */
var blogApp = angular.module('blogApp',['ngRoute','ngMessages']);

blogApp.config(function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    }).when('/blog',{
        templateUrl: 'pages/blog.html',
        controller : 'blogController'
    }).when('/login',{
        templateUrl: 'pages/login.html',
        controller : 'loginController'
    }).when('/register',{
        templateUrl: 'pages/register.html',
        controller : 'registerController'
    });
});

blogApp.controller('homeController',function($scope){

});

blogApp.controller('loginController',function($scope){

});

blogApp.controller('blogController',function($scope){

});

blogApp.controller('registerController',function($scope,multipartForm){
    $scope.register = {};
    $scope.register.retypePassword = '';
    $scope.register.password = '';
    $scope.register.profile_pic = '';
    $scope.$watch('register.password',function (newValue,oldValue) {
        checkPassword();
    });
    $scope.$watch('register.retypePassword', function (newValue,oldValue) {
        checkPassword();
    });

    function checkPassword(){
        if($scope.register.retypePassword !== $scope.register.password){
            $scope.matched = 'The passwords do not match';
        }else{
            $scope.matched = '';
        }
    }
    
    $scope.submit = function () {
        var uploadUrl = '/register/process';
        multipartForm.post(uploadUrl,$scope.register);
    }

});

