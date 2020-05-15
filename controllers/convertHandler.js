function ConvertHandler() {
  
  this.getNum = function(input) {
    const regExNum = /(^\d*[.]?\d*(\d+\/.?[1-9]+)?[.]?\d*$)/;
    const regExUnit = /[a-zA-Z]+$/;
    if(!input) return "invalid number";
    const num = input.replace(regExUnit, "");
    if(!regExNum.test(num)) return "invalid number";
    
    if(num == "") return 1;
    
    if(!/\//.test(num)) return parseFloat(num);
    
    const numArray = num.split("/");
    const result = parseFloat(numArray[0])/parseFloat(numArray[1]);
    return result;
  };
  
  this.getUnit = function(input) {
    const regExUnit = /[a-zA-Z]+$/;
    if(!input) return "invalid unit";
    const acceptedUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    const unit = input.match(regExUnit);
    if (unit === null) return "invalid unit";
    if (acceptedUnits.indexOf(unit[0]) === -1) {
      return "invalid unit";
    } else {return unit[0].toLowerCase();}
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
    
    return Number(conversionObj[initUnit].toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let startUnit = this.spellOutUnit(initUnit);
    let endUnit = this.spellOutUnit(returnUnit);
    if (initNum === 1) startUnit = startUnit.replace("s", "");
    if (returnNum === 1) endUnit = endUnit.replace("s", "");
    
    const string = `${initNum} ${startUnit} converts to ${returnNum} ${endUnit}`
    
    return string;
  };
  
}

module.exports = ConvertHandler;