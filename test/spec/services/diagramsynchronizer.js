'use strict';

describe('Service: Diagramsynchronizer', function () {

  // load the service's module
  beforeEach(module('codiagApp'));

  // instantiate service
  var Diagramsynchronizer;
  beforeEach(inject(function (_Diagramsynchronizer_) {
    Diagramsynchronizer = _Diagramsynchronizer_;
  }));

  it('should do something', function () {
    expect(!!Diagramsynchronizer).toBe(true);
  });

});
