/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const regExNum = /(^\d*[.]?\d*(\d+\/.?[1-9]+)?[.]?\d*$)/;
  const regExUnit = /[a-zA-Z]+$/;
  
  this.getNum = function(input) {
    if(!input) return "invalid input";
    const num = input.replace(regExUnit, "");
    if(!regExNum.test(num)) return "invalid number";
    
    if(num === "") return 1;
    
    if(!/\//.test(num)) return parseFloat(num);
    
    const numArray = num.split("/");
    const result = numArray[0].parseFloat() / numArray[1].parseFloat();
    return result;
  };
  
  this.getUnit = function(input) {
    if(!input) return "invalid input";
    const acceptedUnits = ['gal', 'lbs', 'mi', 'km', 'kg', 'l'];
    const inputArray = regExUnit.match(input);
    if (inputArray === null) return "no unit";
    const unit = inputArray[0].toLowerCase();
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
    let startUnit = this.spelledOutUnit(initUnit);
    let endUnit = this.spelledOutUnit(returnUnit);
    if (initNum === 1) startUnit = startUnit.replace("s", "");
    if (returnNum === 1) endUnit = endUnit.replace("s", "");
    
    const string = `${initNum} ${startUnit} converts to ${returnNum} ${endUnit}`
    
    return string;
  };
  
}

module.exports = ConvertHandler;
