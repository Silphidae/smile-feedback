
var app = angular.module('SmileyFeedbackApp', []);

app.controller('ButtonController', ['$scope', 'storage', function($scope, storage) {

    $scope.results = storage.getResults();

    $scope.counter = 0;

    $scope.addGrade = function(grade) {
        storage.addResult(parseInt(grade));
    }

}]);

app.controller('ListController', ['$scope', 'storage', function($scope, storage) {
    var all = storage.getResults();

    $scope.hyvat = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 1) {count++;}
        }); return count;
    };

    $scope.neutraalit = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 2) {count++;}
        }); return count;
    };

    $scope.huonot = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 3) {count++;}
        }); return count;
    };

}]);

app.service('storage', function () {
    var results = [1,1,2];

    return {
        getResults: function () {
            return results;
        },
        addPResult: function(value) {
            results.push(value);
        }
    };
});
