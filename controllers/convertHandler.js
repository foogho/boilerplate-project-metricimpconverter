class Unit {
  constructor({ name, counterpart, symbol, ratio }) {
    this.name = name;
    this.counterpart = counterpart;
    this.symbol = symbol;
    this.ratio = ratio;
  }
}

const UNITS = [
  new Unit({
    name: 'liters',
    counterpart: 'gallons',
    ratio: 1 / 3.78541,
    symbol: 'L',
  }),
  new Unit({
    name: 'gallons',
    counterpart: 'liters',
    ratio: 3.78541,
    symbol: 'gal',
  }),
  new Unit({
    name: 'miles',
    counterpart: 'kilometers',
    ratio: 1.60934,
    symbol: 'mi',
  }),
  new Unit({
    name: 'kilometers',
    counterpart: 'miles',
    ratio: 1 / 1.60934,
    symbol: 'km',
  }),
  new Unit({
    name: 'pounds',
    counterpart: 'kilogerams',
    ratio: 0.453592,
    symbol: 'lbs',
  }),
  new Unit({
    name: 'kilogerams',
    counterpart: 'pounds',
    ratio: 1 / 0.453592,
    symbol: 'kg',
  }),
];

class ConvertError extends Error {}

function ConvertHandler() {
  this.convert = function (initNum, initUnitSymbol) {
    initNum = initNum || '1';
    if (!this.isNumValid(initNum) && !this.isUnitValid(initUnitSymbol)) {
      throw new ConvertError('invalid number and unit');
    } else if (!this.isNumValid(initNum)) {
      throw new ConvertError('invalid number');
    } else if (!this.isUnitValid(initUnitSymbol)) {
      throw new ConvertError('invalid unit');
    } else {
      const initUnit = this.parseUnit(initUnitSymbol);
      const returnNum = +(initNum * initUnit.ratio).toFixed(5);
      const returnUnit = UNITS.find(
        (unit) => unit.name === initUnit.counterpart
      );
      let result = {
        initNum: this.parseNum(initNum),
        initUnit: initUnit.symbol,
        returnUnit: returnUnit.symbol,
        returnNum: returnNum,
        string: `${initNum} ${initUnit.name} converts to ${returnNum} ${returnUnit.name}`,
      };
      return result;
    }
  };
  this.isNumValid = function (num) {
    const splittedOnSlash = num.split('/');
    if (splittedOnSlash.length > 2) {
      return false;
    }
    return true;
  };
  this.isUnitValid = function (unitSymbol) {
    if (
      !unitSymbol ||
      UNITS.findIndex(
        (unit) => unit.symbol.toLowerCase() === unitSymbol.toLowerCase()
      ) < 0
    ) {
      return false;
    }
    return true;
  };
  this.parseUnit = function (input) {
    let result;
    result = UNITS.find(
      (unit) => unit.symbol.toLowerCase() === input.toLowerCase()
    );
    return result;
  };
  this.parseNum = function (input) {
    let result;
    const splittedOnSlash = input.split('/');
    if (splittedOnSlash.length > 1) {
      result = parseFloat(eval(input));
    } else {
      result = parseFloat(input);
    }
    return result;
  };
}

module.exports = { ConvertHandler, ConvertError };
