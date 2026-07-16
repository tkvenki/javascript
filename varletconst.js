// var: function or global scope, can be re-declared and updated
var x = 10;
var x = 20; // re-declaration allowed
console.log("var:", x); // 20

// let: block scope, can be updated but not re-declared in same block
let y = 30;
// let y = 40; Error (can't re-declare in same block)
y = 40; // update allowed
console.log("let:", y); // 40

// const: block scope, cannot be reassigned
const z = 50;
// z = 60; Error (can't reassign)
console.log("const:", z); // 50