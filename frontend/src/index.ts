class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}

require('./test');

let greeter = new Greeter("Hello, world!");

document.body.innerHTML = greeter.greet();