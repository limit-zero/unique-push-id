const index = require('../src/index');

describe('index', function() {
  it('should export a function', function(done) {
    expect(index).to.be.a('function');
    done();
  });
});
