var myObject = {
a: 2
};


Object.defineProperty( myObject, "a", {
value: 2,
writable: false,
configurable: true,
enumerable: true
} );


console.log(Object.getOwnPropertyDescriptor( myObject, "a" ));
 //{
//value: 2,
//writable: true,
//enumerable: true,
//configurable: true
 //}

