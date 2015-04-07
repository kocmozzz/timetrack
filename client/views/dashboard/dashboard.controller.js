'use strict';

angular.module('timetrack')
  .controller('DashboardCtrl', function ($scope, $localStorage) {
    $scope.task = {
      description: "",
      startTime: 0,
      endTime: 0,
      isTracking: false
    };

    $scope.total = 0;
    $scope.isMinutes = false;

    var storage = $localStorage;

    storage.get().then(function(tasks) {
      $scope.tasks = tasks;
    });

    $scope.$watch('tasks', function() {
      $scope.total = $scope.countTotalHours();
    }, true);

    /*
    * Adds new task to task list.
    *
    * */
    $scope.addTask = function() {
      var newTask = angular.copy($scope.task);

      newTask.description = newTask.description.trim();
      storage.insert(newTask);

      $scope.task.description = "";
    };

    /*
    * Removes task from task list.
    *
    * */
    $scope.removeTask = function(task) {
      storage.delete(task);
    };

    /*
    * Start tracking task time.
    *
    * */
    $scope.startTracking = function(task) {
      if (!task.startTime) {
        task.startTime = moment().format("x");
      }

      task.isTracking = true;

      storage.put(task, $scope.tasks.indexOf(task))
    };

    /*
    * Pause task time tracking.
    *
    * */
    $scope.pauseTracking = function(task) {
      task.endTime = moment().format("x");
      task.isTracking = false;

      storage.put(task, $scope.tasks.indexOf(task))
    };

    /*
    * Count total project time spend.
    *
    * */
    $scope.countTotalHours = function() {
      var minutes = 0;

      $scope.total = 0;

      angular.forEach($scope.tasks, function(task) {
        var endTime = parseInt(task.endTime, 10),
            startTime = parseInt(task.startTime, 10);

        if(endTime) {
          minutes += moment(endTime).diff(moment(startTime), 'minutes');

          $scope.total = Math.round($scope.total / 60);

          if($scope.total == 0) {
            $scope.total = minutes;
            $scope.isMinutes = true;
          }
        }

      });

      return $scope.total;
    }

  });
