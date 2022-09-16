const index = require('./index');

test('the fullname should be firstName + lastName', () => {
  expect(index.getFullName('Sam', 'Medrick')).toBe('SamMedrick');
});

test('string is Palindrome', () => {
  expect(index.isPalindrome('MOM')).toBe(true);
});

test('The circumference is 2* (22/7)* r', () => {
  expect(index.getCircumference(7)).toBe(`The circumference is 44`);
});

test('The circumference is  (22/7)* r* r', () => {
  expect(index.getArea(7)).toBe(`The area is 154`);
});
