'use strict';

angular.module('timetrack').factory('$localStorage', function($q) {
  var STORAGE_KEY = "timetrack";

  var store = {
    tasks: [],

    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },

    _saveToLocalStorage: function (tasks) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },

    delete: function (todo) {
      var deferred = $q.defer();

      store.tasks.splice(store.tasks.indexOf(todo), 1);

      store._saveToLocalStorage(store.tasks);
      deferred.resolve(store.tasks);

      return deferred.promise;
    },

    get: function () {
      var deferred = $q.defer();

      angular.copy(store._getFromLocalStorage(), store.tasks);
      deferred.resolve(store.tasks);

      return deferred.promise;
    },

    insert: function (todo) {
      var deferred = $q.defer();

      store.tasks.push(todo);

      store._saveToLocalStorage(store.tasks);
      deferred.resolve(store.tasks);

      return deferred.promise;
    },

    put: function (todo, index) {
      var deferred = $q.defer();

      store.tasks[index] = todo;

      store._saveToLocalStorage(store.tasks);
      deferred.resolve(store.tasks);

      return deferred.promise;
    }
  };

  return store;
});
