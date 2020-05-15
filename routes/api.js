/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res, next){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
    
      let invalidNum = isNaN(initNum);
      if (initUnit.match(/invalid/) && invalidNum) {
        const err = new Error("invalid number and unit");
        err.status = 400;
        next(err);
      } else if (initUnit.match(/invalid/)) {
        const err = new Error("invalid unit");
        err.status = 400;
        next(err);
      } else if (invalidNum) {
        const err = new Error("invalid number");
        err.status = 400;
        next(err);
      } else if (initUnit.match(/no/)) {
        const err = new Error("no unit");
        err.status = 400;
        next(err);
      }

    
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      return res.json({initNum, initUnit, returnNum, returnUnit, string:toString})
    });
    
};
