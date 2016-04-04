/**
 * Created by root on 28/3/16.
 */
var blogApp = angular.module('blogApp',['ngRoute','ngMessages','ngTagsInput']);

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
    }).when('/profile/:id',{
        templateUrl : 'pages/profile.html',
        controller  : 'profileController'
    }).when('/register',{
        templateUrl: 'pages/register.html',
        controller : 'registerController'
    }).when('/add',{
        templateUrl : 'pages/add.html',
        controller  : 'addController'
    }).when('/list',{
        templateUrl : 'pages/list.html',
        controller  : 'listController'
    }).otherwise({
        redirectTo:'/'
    });
});

blogApp.run(function($rootScope,$location,userData){
    $rootScope.$on('$routeChangeStart',function(event,next, prev){
        if(next.$$route !== undefined){
            //console.log(next.$$route.originalPath);
            var originalPath = next.$$route.originalPath;
            var authPaths = ['/add','/list','/profile/:id'];

            /*if the user is not logged in and the path requires login*/
            /*console.log(!userData.getAll());
            console.log(authPaths.indexOf(originalPath) !== -1);*/
            if(!userData.getAll() && authPaths.indexOf(originalPath) !== -1){
                console.log('user not allowed');
                event.preventDefault();
                $location.path('/login');
            }else{
                console.log('user allowed in this route');
            }
        }else{
            console.log('dont do anything');
        }
    });
});

blogApp.controller('homeController',function($scope,userData,$http,$rootScope){
    if(userData.getAll()){
        $scope.loginStatus = true;
    }else{
        $scope.loginStatus = false;
    }
    $scope.dropdown = false;
    $scope.showDD = function () {
        $scope.dropdown = true;
    };
    $scope.hideDD = function () {
        $scope.dropdown = false;
    };
    
    $scope.logout = function () {
        userData.clearData();
        $rootScope.$broadcast('logoutSuccess');
        $http.get('/login/logout');
    };

    $scope.$on('loginSuccess', function () {
        $scope.loginStatus = true;
    });
    
    $scope.$on('logoutSuccess', function () {
        $scope.loginStatus = false;
    });
});

blogApp.controller('loginController',function($scope,$http,$location,userData,$rootScope){
    $scope.login = {};

    $scope.doLogin = function () {
        $scope.error = '';
        $http.post('/login', $scope.login).then(function (data) {
            var result = data.data.status;

            if(result == 'missing_fields'){
                $scope.error = 'Please add the email and password fields to login';
            }else if(result == 'success'){
                $rootScope.$broadcast('loginSuccess');
                userData.add(data.data); //add the user data to the userDataService
                $location.path('/profile');
            }else if(result == 'failure'){
                $scope.error = 'Invalid credentials';
            }else{
                $scope.error = 'error';
            }
        }, function (err) {
            console.log(err);
        });
    };

});

blogApp.controller('blogController',function($scope,$http){

});

blogApp.controller('profileController', function ($scope,multipartForm,$http,userData) {
    //console.log(userData.getOne('profilePic'));
    var user = userData.getAll();
    $scope.user = user;
    $scope.profileUrl = userData.getOne('profilePic');
    if($scope.profileUrl == undefined){
        $scope.profileUrl = 'defaultImage.jpg';
    }

});

blogApp.controller('registerController',function($scope,multipartForm){
    $scope.register = {};
    $scope.register.retypePassword = '';
    $scope.register.password = '';
    $scope.register.profile_pic = '';
    $scope.formSubmitted = false;
    $scope.userSaved = false;

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
        var result = multipartForm.post(uploadUrl,$scope.register, function (data) {
          if(data == 'true'){
              $scope.formSubmitted = true;
              $scope.userSaved = true;
          }else if(data == 'false'){
              $scope.formSubmitted = true;
              $scope.userSaved = false;
          }else{
              console.log('return value should be either true or false');
          }
        });
    }

});

blogApp.controller('addController', function ($scope) {
    $scope.addForm = {};
});

