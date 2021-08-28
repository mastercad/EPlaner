// mixin
let sayHiMixin = {
    sayHi() {
        alert(`Hello ${this.name}`);
    },

    sayBye() {
        alert(`Bye ${this.name}`);
    }
};

// usage:
class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
