'use strict';

angular.module('timetrack')
  .controller('DashboardCtrl', function ($scope, $localStorage) {
    $scope.task = {
      description: "",
      startTime: 0,
      trackTime: 0,
      logging: [],
      isTracking: false
    };

    $scope.total = 0;
    $scope.isMinutes = false;

    var storage = $localStorage;

    storage.get().then(function(tasks) {
      $scope.tasks = tasks;
    });

    $scope.$watch('tasks', function() {
      $scope.total = $scope.countTotalTime();
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

      var log = {
        start: moment().format("x")
      };

      task.logging.push(log);

      task.isTracking = true;

      storage.put(task, $scope.tasks.indexOf(task))
    };

    /*
    * Pause task time tracking.
    *
    * */
    $scope.pauseTracking = function(task) {
      task.logging[task.logging.length - 1].end = moment().format("x");

      task.trackTime = moment().format("x");
      task.isTracking = false;

      storage.put(task, $scope.tasks.indexOf(task))
    };

    function calculateTotalLoggingTime(task) {
      var ms = 0;

      angular.forEach(task.logging, function(log) {
        var endTime = parseInt(log.end, 10),
          startTime = parseInt(log.start, 10);

        if(endTime) {
          ms += moment(endTime).diff(moment(startTime));
        }
      });

      return ms;
    }

    function formatInHours(ms) {
      return Math.round(moment.duration(ms).asHours())
    }

    /*
    * Calculate time duration.
    * */
    $scope.getTimeDuration = function(task) {
      var ms = calculateTotalLoggingTime(task);

      if (!ms) {
        return 0;
      }

      return formatInHours(ms);
    };

    /*
    * Count total project time spend.
    *
    * */
    $scope.countTotalTime = function() {
      var ms = 0;

      angular.forEach($scope.tasks, function(task) {
        ms += calculateTotalLoggingTime(task);
      });

      return formatInHours(ms);
    }

  });
