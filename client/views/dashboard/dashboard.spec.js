'use strict';

describe('Controller: DashboardCtrl', function () {

  beforeEach(module('timetrack'));

  var DashboardCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
