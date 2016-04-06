'use strict'

var app = angular.module('SmileyFeedbackApp', []);

app.controller('ButtonController', ['$scope', 'storage', function($scope, storage) {

    $scope.addGrade = function(grade) {
        storage.addResult(grade);
    }

}]);

app.controller('ListController', ['$scope', 'storage', function($scope, storage) {
    var all = storage.getResults();

    $scope.positive = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 1) {count++;}
        }); return count;
    };

    $scope.neutral = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 2) {count++;}
        }); return count;
    };

    $scope.negative = function() {
        var count = 0;
        angular.forEach(all, function (grade) {
            if (grade == 3) {count++;}
        }); return count;
    };

    $scope.deleteAll = function() {
        storage.deleteResults();

    }

}]);

app.service('storage', function () {
    var results = [];

    return {
        getResults: function () {
            return results;
        },
        addResult: function(value) {
            results.push(value);
        },
        deleteResults: function() {
            results.length = 0;
        }
    };
});

app.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);