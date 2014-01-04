'use strict';

describe('Service: Diagram', function () {

  // load the service's module
  beforeEach(module('codiagApp'));

  // instantiate service
  var Diagram;
  beforeEach(inject(function (_Diagram_) {
    Diagram = _Diagram_;
  }));

  it('should do something', function () {
    expect(!!Diagram).toBe(true);
  });

});
