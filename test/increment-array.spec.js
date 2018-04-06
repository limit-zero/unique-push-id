const incrementArray = require('../src/increment-array');

describe('increment-array', function() {
  it('should export a function.', function(done) {
    expect(incrementArray).to.be.a('function');
    done();
  });
  it('should throw an error when the first arg is not an array.', function(done) {
    expect(() => incrementArray(1)).to.throw(Error, 'The first argument must be an array.');
    done();
  });
  it('should increment the array.', function(done) {
    const arr = [23, 43, 32];
    incrementArray(arr, 63);
    expect(arr).to.deep.equal([23, 43, 33]);
    done();
  });
  it('should increment the array and set the max to 0.', function(done) {
    const arr = [23, 43, 63];
    incrementArray(arr, 63);
    expect(arr).to.deep.equal([23, 44, 0]);
    done();
  });

  it('should increment the array and set the max to 0 multiple times.', function(done) {
    const arr = [23, 63, 63];
    incrementArray(arr, 63);
    expect(arr).to.deep.equal([24, 0, 0]);
    done();
  });
});
