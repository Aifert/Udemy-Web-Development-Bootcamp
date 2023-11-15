// var generateName = require("sillyname");

import generateName from "sillyname";
import  superheroes from "superheroes";
var sillyName = generateName();

var superhero = superheroes.random();

console.log(`My name is ${sillyName}`);

console.log(`My name is ${superhero}`);

