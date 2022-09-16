function getFullName(firstName, lastName) {
  return firstName + lastName;
}

function isPalindrome(input) {
  return input.toString().split('').reverse().join('') === input.toString();
  // console.log(
  //   input.toString().split('').reverse().join('') === input.toString()
  // );
}

function getCircumference(r) {
  const circm = 2 * (22 / 7) * r;
  return `The circumference is ${circm}`;
}

function getArea(r) {
  const area = (22 / 7) * r * r;
  return `The area is ${area}`;
}

module.exports = {
  getFullName,
  isPalindrome,
  getCircumference,
  getArea,
};
