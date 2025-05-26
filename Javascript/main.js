// console.log("hello world!");
// console.error('this is an error');
// console.warn('warning!');

//VARIABLES
//var is globally scoped, dont use it
let age = 30;
console.log(age);
age = 31;
console.log(age);

const num = 10;
console.log(num);
//num = 11 wont work

//Always use const unless you know you'll change values, makes code more secure 
//and less prone to error.

//DATATYPES
//Primitive datatypes are assigned to memory, not a resource
//Strings, numbers, boolean, null, undefined, symbol

const name = 'John'; //string 
const years = 30; //number
const rating = 4.5;  //number
const isCool = true; //boolean
const x = null; //null
const y = undefined; //undefined
let z; //undefined

// console.log(typeof z);

// Concatenation
console.log('my name is ' + name + ' and I am ' + age);
// Template String
const hello = `My name is ${name} and I am ${age}`;
console.log(hello);

//String methods/property
const s = 'Hello World';
const list = 'tech, computers, it, code';
console.log(s.toUpperCase());
console.log(s.toLowerCase());
console.log(s.substring(0,5).toUpperCase());
console.log(s.split('')) //by letter
console.log(list.split(', ')) //delimiter

//ARRAYS - variable that holds multiple values, no need to be the same datatype
const fruits = ['apples', 'oranges', 'bananas'];
console.log(fruits);
console.log(fruits[1]);

fruits[3] = 'grapes';
fruits.push('mangos');
fruits.unshift('strawberries');
fruits.pop();
console.log(fruits);
console.log(fruits.indexOf('oranges'));

//OBJECT LITERALS
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    hobbies: ['music', 'movies', 'gaming'],
    address: {
        street: '123 main st',
        city: 'Boston',
        state: 'MA'
    }
}
person.email = 'john1221@gmail.com';

console.log(person);
console.log(person.firstName, person.lastName);
console.log(person.hobbies[1]);
console.log(person.address.city);

const {firstName, lastName, address:{city}} = person;

//Arrays of objects
const todos = [
    {
        id:1,
        text: 'take trash',
        isCompleted: true
    },
    {
        id:2,
        text: 'meet boss',
        isCompleted: true
    },
    {
        id:3,
        text: 'dentist today',
        isCompleted: false
    }
]

console.log(todos);
console.log(todos[1].text)

//JSON Format!! - no single quotes
const todosJSON = JSON.stringify(todos); //This is how we send data to a server, through JSON
console.log(todosJSON);

// LOOPS
//for loops 
for(let i=0; i < 10; i++) {
    console.log(`For Loop Number ${i}`);
}

//while loops
let i = 0;
while(i < 10) {
    console.log(`While Loop Number ${i}`);
    i++;
}

//loop thru an array
for(let i=0; i < todos.length; i++) {
    console.log(todos[i].text);
}

for(let todo of todos) {
    console.log(todo.id)
}

//high order array methods
//forEach, map, filter -- Map returns new array, filter returns based on condition

// todos.forEach(function(todo) {
//     console.log(`ForEach method looping ${todo.text}`);
// });

// const todoText = todos.map(function(todo) {
//     return todo.text;
// })
// console.log(todoText);

// const todoCompleted = todos.filter(function(todo) {
//     return todo.isCompleted == true;
// }).map(function(todo) {
//     return todo.text
// });

// console.log(todoCompleted);


//CONDITIONALS
// == matches the value, not the datatype, === matches both
const xx = 6;
const yy = 11;
if(xx > 5 && yy > 10) {
    console.log('xx is more than 5 or y is more than 10');
}

const numm = 10;
const color = numm > 10 ? 'red' : 'blue';
console.log(color);

//SWITCH

switch(color) {
    case 'red':
        console.log('color is red');
        break;
    case 'blue':
        console.log('color is blue');
        break;
    default:
        console.log('color isnt either');
        break;
}

//FUNCTIONS

function addNums(num1 = 1, num2 = 1) {
    return num1 + num2;
}

const addNumsArrow = (num1 = 1, num2 = 1) => {
    return num1 + num2;
}
console.log(addNums(5,5));
console.log(addNumsArrow(50,50));

todos.forEach((todo) => console.log(todo.text));

//OOP
//constructor functions
// function Person(firstName, lastName, dob) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob);
// }
// //put methods and properties onto prototype so they arent re-created each time a new object is created
// Person.prototype.getBirthYear = function() {
//     return this.dob.getFullYear();
// }
// Person.prototype.getFullName = function() {
//     return `${this.firstName} ${this.lastName}`;
// }

//CLASS
class Person {
    constructor(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob);
    }

    getBirthYear() {
        return this.dob.getFullYear();
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

//instantiate an object
const person1 = new Person('Jimmy', "Neutron", '10/24/2003');
console.log(person1.getBirthYear());
console.log(person1.getFullName());
console.log(person1);


//DOM

