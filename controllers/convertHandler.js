/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const regEx = /(^\d*[.]?\d*[\/]?\d*[.]?\d*)([a-zA-z]+$)/;
  
  this.getNum = function(input) {
    if(!input) return "invalid input";
    if(!regEx.test(input)) return "invalid input";
    
    const resultArray = regEx.match(input);
    const num = resultArray[0]
    
    if(num === null) return 1;
    
    if(!/\//.test(num)) return parseFloat(num);
    
    const numArray = num.split("/");
    const result = numArray[0].parseFloat() / numArray[1].parseFloat();
    return result;
  };
  
  this.getUnit = function(input) {
    const acceptedUnits = ['gal', 'lbs', 'mi', 'km', 'kg', 'l'];
    const inputArray = regEx.match(input);
    const unit = inputArray[1].toLowerCase();
    if (acceptedUnits.indexOf(unit) === -1) {
      return 'invalid unit';
    } else {return unit;}
  };
  
  this.getReturnUnit = function(initUnit) {
    const conversionObj = {
      gal: "l",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    }
    
    return conversionObj[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOutObj = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    }
    
    return spellOutObj[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const conversionObj = {
      gal: initNum*galToL,
      l: initNum/galToL,
      lbs: initNum*lbsToKg,
      kg: initNum/lbsToKg,
      mi: initNum*miToKm,
      km: initNum/miToKm
    };
    
    return +conversionObj[initUnit].toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let startUnit = initUnit;
    let endUnit = returnUnit;
    if (initNum === 1) startUnit = initUnit.replace("s", "");
    if (returnNum === 1) endUnit = returnUnit.replace("s", "");
    
    const string = `${initNum} ${startUnit} converts to ${returnNum} ${endUnit}`
    
    return string;
  };
  
}

module.exports = ConvertHandler;
