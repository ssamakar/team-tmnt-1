'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('teamTmntApp'));

  var MainCtrl;
  var scope;
  var myFakeTeam = {fake: 'stuff'};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      teams: myFakeTeam
    });
  }));

  it('should attach teams to the scope', function () {
    expect(scope.teams).toBeDefined();
  });

  it('should attach the teams service to scope', function(){
    expect(scope.teams).toEqual(myFakeTeam);
  });

});
