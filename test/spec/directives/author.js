'use strict';

describe('Directive: author', function () {

  // load the directive's module
  beforeEach(module('codiagApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<author></author>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the author directive');
  }));
});
