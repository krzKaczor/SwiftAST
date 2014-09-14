var assert = require("assert");
var fs = require("fs");
var path = 'tests/fixtures/';
var errors = require("../SwiftScript/models/errors.js");
var SwiftScript = require("../SwiftScript/swiftScript.js");

describe("Functions", function() {
  var swiftScript;
  beforeEach(function() {
    swiftScript = new SwiftScript();
  });

  it('should fill types of int function correctly', function() {
    var input = fs.readFileSync(path + "BunchOfFunctions.swift", "utf8");
    var ast = swiftScript.astWithTypes(input);

    var returningIntFunctionSignature = ast.scope.resolve("returningIntFunction").type;
    assert.equal(returningIntFunctionSignature.paramType.expressionsTypes[0].name, "Int");
    assert.equal(returningIntFunctionSignature.returnType.name, "Int");
  });

  it('should fill types of double function correctly', function() {
    var input = fs.readFileSync(path + "BunchOfFunctions.swift", "utf8");
    var ast = swiftScript.astWithTypes(input);

    var returningIntFunctionSignature = ast.scope.resolve("returningDoubleFunction").type;
    assert.equal(returningIntFunctionSignature.paramType.expressionsTypes[0].name, "Double");
    assert.equal(returningIntFunctionSignature.returnType.name, "Double");
  });

  it('should raise exception when arguments do not match function signature', function() {
    var input = fs.readFileSync(path + "BunchOfFunctions.swift", "utf8");
    input += "returningIntFunction(5.0);";
    assert.throws( function() { return swiftScript.astWithTypes(input); }, errors.TypeInconsistencyError);
  });

  it('should allow function as first class citizens', function() {
    var input = fs.readFileSync(path + "BunchOfFunctions.swift", "utf8");
    var ast = swiftScript.astWithTypes(input);

    var scope = ast.scope;
    var applyZero = scope.resolve("applyZero").type;
    assert.equal(applyZero.returnType.name, "Int");
    assert.equal(applyZero.paramType.expressionsTypes[0].CLASS, "FunctionType");
  });

});