'use strict';

describe('Controller: TeamCtrl', function () {

  // load the controller's module
  beforeEach(module('teamTmntApp'));

  var TeamCtrl,
    scope;
  var team = [{}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamCtrl = $controller('TeamCtrl', {
      $scope: scope,
      team: team
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    console.log(team);
    expect(typeof scope.team).toBe('object');
  });
});
