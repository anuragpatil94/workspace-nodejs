var square = (x) => x * x;
console.log(square(4));

var user = {
    name: 'Anurag',
    sayHi: () => {
        console.log(arguments);//This will give result for global function
        //console.log(`Hi, I'm ${this.name}`); this keyword will not work for arrow functions.
    },
    //Regular functions can be used as alternative to use this keyword
    //also when we are using variables from same objects in the function.
    //Regular funcitons will have arguments array but arrow functions  doesn't have.
    sayHiAlt() {
        console.log(arguments);

        console.log(`Hi, I'm ${this.name}`);
    }
};

user.sayHi(1, 2, 3);
console.log('------------------------------');

user.sayHiAlt(1, 2, 3);
