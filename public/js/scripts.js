'use strict'

var app = angular.module('SmileyFeedbackApp', []);

app.controller('ButtonController', ['$scope' ,'$http',  function($scope, $http) {

    $scope.addGrade = function(grade){
        $http({method: 'GET', url: '/db/addResult?result='+grade})
    };

}]);

app.controller('ListController', ['$scope' ,'$http',  function($scope, $http) {

    var one = 0;
    var two = 0;
    var three = 0;

    $scope.positive = 0;
    $scope.neutral = 0;
    $scope.negative = 0

    $http.get('/db/getResults')
        .success(function(data) {
            var json_data = data;
            var result = [];
            for(var i in json_data) {
                result.push(json_data[i].result);
                if (json_data[i].result == 1) {
                    one++;
                }
                if (json_data[i].result == 2) {
                    two++;
                }
                if (json_data[i].result == 3) {
                    three++;
                }
            }
            $scope.positive = one;
            $scope.neutral = two;
            $scope.negative = three;
        })

    $scope.deleteAll = function(){
        $http.get('/db/delResults')
            .success(function(data) {
                window.location.reload(true);
            })
    };

}]);

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