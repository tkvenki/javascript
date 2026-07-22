Actually, `Object.create()` **does create an object**. The important distinction is **what kind of object** it creates.

Many tutorials say "it doesn't create a copy," which often gets misinterpreted as "it doesn't create an object."

## `Object.create()` creates a new object

For example:

```javascript
let foo = {
    a: 42
};

let bar = Object.create(foo);

console.log(bar);
```

Output:

```javascript
{}
```

`bar` is a brand new object. It is just **empty**.

Think of it as:

```
foo
 ┌────────────┐
 │ a : 42     │
 └────────────┘
       ▲
       │ prototype
       │
bar
 ┌────────────┐
 │            │
 └────────────┘
```

So `bar` **exists**. It simply doesn't own any properties yet.

---

## Compare different ways of creating objects

### 1. Object literal (most common)

```javascript
let person = {
    name: "Venki",
    age: 30
};
```

Creates

```
person
┌───────────────────┐
│ name : "Venki"    │
│ age  : 30         │
└───────────────────┘
```

---

### 2. `new Object()`

```javascript
let person = new Object();

person.name = "Venki";
```

Exactly the same result.

---

### 3. `Object.create()`

```javascript
let foo = {
    a: 42
};

let bar = Object.create(foo);
```

Creates

```
foo
┌───────────┐
│ a : 42    │
└───────────┘
      ▲
      │
bar
┌───────────┐
│           │
└───────────┘
```

Notice `bar` is empty.

Then

```javascript
bar.b = "Hello";
```

becomes

```
foo
┌───────────┐
│ a : 42    │
└───────────┘
      ▲
      │
bar
┌─────────────────┐
│ b : "Hello"     │
└─────────────────┘
```

---

## 4. Constructor functions

```javascript
function Person(name) {
    this.name = name;
}

let p = new Person("Venki");
```

Creates

```
p
┌─────────────────┐
│ name : "Venki"  │
└─────────────────┘
```

and also links it to `Person.prototype`.

---

## Why does `Object.create()` exist?

Normally, when you create an object:

```javascript
let obj = {};
```

JavaScript secretly does something like:

```
Object.prototype
       ▲
       │
      obj
```

Every object created with `{}` inherits from `Object.prototype`.

But with `Object.create()`, **you choose the prototype**.

Example:

```javascript
let animal = {
    eat() {
        console.log("Eating");
    }
};

let dog = Object.create(animal);
```

Now

```
animal
┌───────────────┐
│ eat()         │
└───────────────┘
       ▲
       │
dog
┌───────────────┐
│               │
└───────────────┘
```

`dog` can use `eat()` even though it doesn't own it.

---

## An important interview question

What is the difference between these?

```javascript
let a = {};
```

and

```javascript
let b = Object.create(null);
```

### `a`

```
Object.prototype
       ▲
       │
       a
```

`a` inherits methods like:

* `toString()`
* `hasOwnProperty()`
* `valueOf()`

### `b`

```
b
```

No prototype at all.

```javascript
let b = Object.create(null);

console.log(b.toString);
```

Output:

```javascript
undefined
```

because there is no prototype chain.

---

### Rule to remember

* `{}` → Creates a new object with `Object.prototype` as its prototype.
* `new Object()` → Same as `{}`.
* `Object.create(proto)` → Creates a new object with **`proto` as its prototype**.
* `new Constructor()` → Creates a new object whose prototype is `Constructor.prototype`.

So the key point is: **`Object.create()` absolutely creates a new object. It just doesn't copy the object you pass to it; instead, it uses that object as the new object's prototype.**
