'use strict';

// thiskeyword.js
// JavaScript training module: understanding how `this` works

console.log('--- JS this keyword training ---');

// 1. Method call: `this` refers to the object before the dot.
const obj = {
  name: 'vivek',
  getName() {
    console.log('obj.getName() ->', this.name);
  }
};
obj.getName();

// 2. Function call: in strict mode, `this` is undefined.
const obj1 = {
  name: 'vivek',
  getName() {
    console.log('obj1.getName() ->', this.name);
  }
};

const getName = obj1.getName;
console.log('getName() ->', getName());

// 3. Reassigning the method: `this` now points to the new object.
const obj2 = {
  name: 'akshay',
  getName
};
obj2.getName();

// 4. Arrow functions do not have their own `this`.
const arrowExample = {
  name: 'arrow object',
  regularMethod() {
    console.log('regularMethod:', this.name);
  },
  arrowMethod: () => {
    console.log('arrowMethod:', this.name);
  },
  nestedMethod() {
    function innerFunction() {
      console.log('innerFunction:', this && this.name);
    }
    const innerArrow = () => {
      console.log('innerArrow:', this.name);
    };
    innerFunction();
    innerArrow();
  }
};
arrowExample.regularMethod();
arrowExample.arrowMethod();
arrowExample.nestedMethod();

// 5. Explicit binding: call, apply, bind.
const person = { name: 'Rohan' };
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.call(person, 'Hi', '!');
greet.apply(person, ['Hello', '?']);

const boundGreet = greet.bind(person, 'Hey');
boundGreet('!!!');

// 6. Constructor function with `new`: `this` refers to the newly created instance.
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log('Person.sayName ->', this.name);
};

const personInstance = new Person('Vidya');
personInstance.sayName();

// 7. Training notes and practice problems.
console.log('\n--- Key concepts ---');
console.log('- Method call: `this` points to the object that owns the method.');
console.log('- Function call: strict mode makes `this` undefined.');
console.log('- Arrow functions: lexical `this` from the surrounding scope.');
console.log('- call/apply/bind: explicitly set `this`.');
console.log('- Constructor (`new`): `this` is the new instance.');

console.log('\n--- Practice tasks ---');
console.log('1. Create an object with a method and call it from a variable reference.');
console.log('2. Compare results between a normal function and an arrow function used as a callback.');
console.log('3. Use `bind` to permanently attach `this` to a new function.');
console.log('4. Build a simple constructor function and add a method on its prototype.');
