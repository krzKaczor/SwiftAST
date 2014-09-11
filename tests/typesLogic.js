var assert = require("assert");
var errors = require("../SwiftScript/models/errors.js");
var types = require("../SwiftScript/models/typeSystem.js").types;

describe("TypeSystem", function () {
  var javaLikeTypes;
  beforeEach(function () {
    var object = new types.NamedTypeSymbol("Object");
    var string = new types.NamedTypeSymbol("String", object);
    var integer = new types.NamedTypeSymbol("Integer", object);
    var buffer = new types.NamedTypeSymbol("Buffer", object);
    var shortBuffer = new types.NamedTypeSymbol("ShortBuffer", buffer);
    var longBuffer = new types.NamedTypeSymbol("LongBuffer", buffer);

    javaLikeTypes = {
      object: object,
      string: string,
      integer: integer,
      buffer: buffer,
      shortBuffer: shortBuffer,
      longBuffer: longBuffer
    };
  });

  it('should detect common type', function () {
    assert.equal(javaLikeTypes.string.findCommonType(javaLikeTypes.integer), javaLikeTypes.object);
  });

  it('should detect common type', function () {
    assert.equal(javaLikeTypes.string.findCommonType(javaLikeTypes.object), javaLikeTypes.object);
  });

  it('should detect common type', function () {
    assert.equal(javaLikeTypes.longBuffer.findCommonType(javaLikeTypes.shortBuffer), javaLikeTypes.buffer);
  });

  it('should not detect common type', function () {
    assert.equal(javaLikeTypes.string.findCommonType(new types.NamedTypeSymbol("MyType")), undefined);
  });
});