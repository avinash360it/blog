/**
 * Created by root on 31/3/16.
 */
blogApp.service('userData', function () {
    var userData = {};
    //sessionStorage.setItem('userData','{}');
    this.getAll = function () {
        return JSON.parse(sessionStorage.getItem('userData'));
    };

    this.getOne = function (property) {
        var userData = JSON.parse(sessionStorage.getItem('userData'));
        var property = userData[property];
        return property;
    };

    this.clearData = function () {
        userData = {};
        sessionStorage.removeItem('userData');
        return userData;
    };

    this.add = function (properties) {
        //sessionStorage.removeItem('userData');
        userData = JSON.parse(sessionStorage.getItem('userData'));
        if(!userData){
            userData = [];
        }
        for (var property in properties){
            userData[property] = properties[property];
        }
        sessionStorage.setItem('userData',JSON.stringify(userData));
        return userData;
    }
});