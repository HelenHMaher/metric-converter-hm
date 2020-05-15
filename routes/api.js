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
      const input = req.query.input;
    
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
    
      const invalidNum = isNaN(initNum);
    
      if (initUnit === "invalid unit") {
        if (invalidNum) {
        const err = new Error("invalid number and unit");
        err.status = 400;
        next(err);
        } else {
        const err = new Error("invalid unit");
        err.status = 400;
        next(err);
        } 
      } else if (invalidNum) {
        const err = new Error("invalid number");
        err.status = 400;
        next(err);
      } else if (!invalidNum && initUnit !== "invalid unit"){
      
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.status(200).json({initNum, initUnit, returnNum, returnUnit, string:toString})
    }
  });
    
};
