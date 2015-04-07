'use strict';

angular.module('timetrack')
  .controller('DashboardCtrl', function ($scope) {
    $scope.task = {
      description: "",
      startTime: 0,
      endTime: 0
    };

    $scope.tasks = [];

    $scope.addTask = function() {
      var newTask = angular.copy($scope.task);

      newTask.description = newTask.description.trim();

      $scope.tasks.push(newTask);

      $scope.task.description = "";
    };

    $scope.removeTask = function(task) {
      $scope.tasks.splice($scope.tasks.indexOf(task), 1);
    };
  });
