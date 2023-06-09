const chai = require('chai');
let assert = chai.assert;
const { ConvertHandler } = require('../controllers/convertHandler.js');

suite('Convert Handler', function () {
  let convertHandler = new ConvertHandler();
  test('should correctly read a whole number input', () => {
    const result = convertHandler.convert('5', 'l');
    assert.strictEqual(result.initNum, 5);
  });
  test('should correctly read a decimal input', () => {
    const result = convertHandler.convert('2.3', 'l');
    assert.strictEqual(result.initNum, 2.3);
  });
  test('should correctly read a fractional input', () => {
    const result = convertHandler.convert('10/5', 'l');
    assert.strictEqual(result.initNum, 2);
    assert.strictEqual(result.returnNum, 0.52834);
  });
  test('should correctly read a fractional input with a decimal', () => {
    const result = convertHandler.convert('10.5/2', 'l');
    assert.strictEqual(result.initNum, 5.25);
  });
  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    assert.throw(() => {
      convertHandler.convert('3/2/3', 'l');
    }, 'invalid number');
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    const result = convertHandler.convert(undefined, 'l');
    assert.strictEqual(result.initNum, 1);
  });

  test('should correctly read each valid input unit', () => {
    let result = convertHandler.convert('1', 'gal');
    assert.strictEqual(result.initUnit, 'gal');
    result = convertHandler.convert('5', 'km');
    assert.strictEqual(result.initUnit, 'km');
  });

  test('should correctly return an error for an invalid input unit', () => {
    assert.throw(() => {
      convertHandler.convert('1', 'cm');
    }, 'invalid unit');
  });

  test('should correctly return an error for both invalid unit and invalid number', () => {
    assert.throw(() => {
      convertHandler.convert('2/3/4', 'cm');
    }, 'invalid number and unit');
  });

  test('should return the correct return unit for each valid input unit', () => {
    let result = convertHandler.convert('2', 'km');
    assert.strictEqual(result.returnUnit, 'mi');
    result = convertHandler.convert('5', 'lbs');
    assert.strictEqual(result.returnUnit, 'kg');
  });

  test('should correctly return the spelled-out string unit for each valid input unit', () => {
    let result = convertHandler.convert('2.5', 'mi');
    assert.include(result.string, 'miles', 'mi should be converted to miles');
    assert.include(
      result.string,
      'kilometers',
      'km should be converted to kilometers'
    );
    result = convertHandler.convert('2.3/5', 'gal');
    assert.include(
      result.string,
      'gallons',
      'gal should be converted to gallons'
    );
    assert.include(result.string, 'liters', 'l should be converted to liters');
  });

  test('should correctly convert gal to L', () => {
    const result = convertHandler.convert('5', 'gal');
    assert.strictEqual(result.returnNum, 18.92705);
  });

  test('should correctly convert L to gal', () => {
    const result = convertHandler.convert('12', 'l');
    assert.strictEqual(result.returnNum, 3.17007);
  });

  test('should correctly convert mi to km', () => {
    const result = convertHandler.convert('6.5', 'mi');
    assert.strictEqual(result.returnNum, 10.46071);
  });

  test('should correctly convert km to mi', () => {
    const result = convertHandler.convert('150', 'km');
    assert.strictEqual(result.returnNum, 93.20591);
  });

  test('should correctly convert lbs to kg', () => {
    const result = convertHandler.convert('270', 'lbs');
    assert.strictEqual(result.returnNum, 122.46984);
  });

  test('should correctly convert kg to lbs', () => {
    const result = convertHandler.convert('80', 'kg');
    assert.strictEqual(result.returnNum, 176.36995);
  });
});
