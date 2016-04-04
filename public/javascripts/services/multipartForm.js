/**
 * Created by root on 28/3/16.
 */
blogApp.service('multipartForm',['$http', function($http){
    this.post = function (uploadUrl,data,cb) {
        var fd = new FormData();
        for(var key in data){
            fd.append(key,data[key]);
        }
        $http.post(uploadUrl,fd,{
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (data) {
            cb('true')
        }, function (err) {
            cb('false');
        });
    }
}]);