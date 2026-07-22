This is one of the trickiest parts of traditional JavaScript, and it comes down to how `with` interacts with **lexical scope** and **LHS (Left-Hand Side) lookups**.

Here is exactly what is happening under the hood step-by-step.

### 1. What `with` actually does

The `with` statement takes an object and treats it as if it were a completely separate lexical scope. When you look up a variable inside `with`, JavaScript treats the object's properties as local variables in that scope.

### 2. The First Call: `foo(o1)`

When you pass `o1` into `foo`:

* The `with` block treats `o1` as a scope.
* JavaScript looks for the variable `a` inside this scope.
* Since `o1` has a property named `a` (`o1.a = 3`), it finds it.
* It assigns `2` to it. `o1.a` successfully becomes `2`.

### 3. The Second Call: `foo(o2)` (The Leak)

When you pass `o2` into `foo`, things go off the rails:

* The `with` block treats `o2` as a scope.
* The engine performs an **LHS lookup** for `a` (it's looking for the container to assign `2` into).
* **Step 1:** It looks inside the `o2` scope. Does `o2` have a property called `a`? **No** (it only has `b`).
* **Step 2:** Because it didn't find `a` in the current scope, the engine moves up to the next outer scope, which is the function scope of `foo`. Does `foo` have a local variable declared as `var a` or `let a`? **No**.
* **Step 3:** The engine moves up again to the next outer scope, which is the **global scope**. Does the global scope have a variable `a`? **No**.

### The Climax: Why it leaks

Normally, if you try to *read* a variable that doesn't exist anywhere (RHS lookup), JavaScript throws a `ReferenceError`.

However, in non-strict mode, when you try to *assign* a value to a variable that doesn't exist anywhere (LHS lookup), **the global scope helpful peer-creates that variable for you in the global context.**

So, because `a` wasn't found in `o2`, wasn't found in `foo`, and wasn't found in the global scope, the engine created `window.a = 2` (or `global.a = 2`) out of thin air.

* `o2.a` remains `undefined` because `with` never created a property on `o2`; it just searched it like a scope map.
* `console.log(a)` prints `2` because you are now reading that accidental global variable.

### How to prevent this

This unpredictable behavior is exactly why `with` is completely **forbidden in JavaScript's strict mode**. If you run this exact code with `"use strict";` at the top, JavaScript won't create a global variable; it will rightfully throw a `ReferenceError: a is not defined`.