var assert = require('..').assert;

console.log('A == A');
try{
    assert("A","==","A");
}
catch(e){
    console.log(e.message);
}

console.log('B == C');
try{
    assert("B","==","C");
}
catch(e){
    console.log(e.message);
}

console.log("[] is array");
try{
    assert([],"array");
}
catch(e){
    console.log(e.message);
}

console.log("{} is array");
try{
    assert({},"array");
}
catch(e){
    console.log(e.message);
}

function A(){};
function B(){};
var a = new A();
console.log("a is an instance of A");
try{
    assert(a,"instanceof", A);
}
catch(e){
    console.log(e.message);
}

console.log("a is an instance of B");
try{
    assert(a,"instanceof", B);
}
catch(e){
    console.log(e.message);
}
