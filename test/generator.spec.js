const generateId = require('../src/generator');

describe('generator', function() {
  it('should export a function.', function(done) {
    expect(generateId).to.be.a('function');
    done();
  });
  it('should generate a 20-byte, web-safe Base64 string', function(done) {
    expect(generateId()).to.match(/[0-9a-zA-Z-_]{20}/);
    done();
  });
  it('should generate unique ids.', function(done) {
    const ids = [];
    for (let i = 0; i < 10000; i += 1) {
      ids.push(generateId());
    }
    const unique = [...new Set(ids)];
    expect(ids).to.deep.equal(unique);
    done();
  });
});
