var chai = require('chai');
 
 //include stack trace
chai.config.includeStack = true;
 
//expose chai methods globally
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;