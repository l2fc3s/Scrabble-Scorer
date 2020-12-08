const input = require('readline-sync');

// Here is the oldScoreKey object:
const oldScoreKey = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// Code your transform function here:
function transform (obj) {
  let newScoreKey = {};
  
  for(let item in oldScoreKey) {
    let letters = oldScoreKey[item];

    for(let i = 0; i < letters.length; i++) {
      newScoreKey[letters[i].toLowerCase()] = Number(item);
    }
  }
    return newScoreKey;
}

// Code your initialPrompt function here:

function initialPrompt() {
  let prompt = input.question(`
Welcome to the Scrabble score calculator!
  
Which scoring algorithm would you like to use?
  
0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.
  
Enter 0, 1, or 2: `);
prompt = Number(prompt);
if(isNaN(prompt)){
  prompt = 0;
}

if(prompt > 2 || prompt < 0){
  prompt = 0;
}
return Number(prompt);
}

// Code your runProgram function here:

function runProgram(arr) {
  
  let index = initialPrompt();
  console.log(
    `\nUsing algorithm: ${scoringAlgorithms[index].name}.`);

  let finalScore = 0;  
  
  let wordPrompt = '';
  while (wordPrompt.toLowerCase() !== 'stop') {
    wordPrompt = input.question("\nEnter a word to be scored, or 'Stop' to quit: ");

    if (wordPrompt.toLowerCase() === 'stop') {
      console.log(`\nFinal score: ${finalScore}!`);
      break;
    } else if(index === 0 ) {
    console.log(`Score for ${wordPrompt}: ${scoringAlgorithms[index].scoreFunction(wordPrompt,newPointStructure)}`);
    finalScore += scoringAlgorithms[index].scoreFunction(wordPrompt,newPointStructure);

    } else {
    console.log(`Score for ${wordPrompt}: ${scoringAlgorithms[index].scoreFunction(wordPrompt)}`);
    finalScore += scoringAlgorithms[index].scoreFunction(wordPrompt,newPointStructure);
    }
  }
}

// Use the transform function to create the newScoreKey object here:

let newPointStructure = transform(oldScoreKey);
newPointStructure[' '] = 0;

// Create your scoringAlgorithms array here:
function simpleScore(str) {
  return str.length;
}
//console.log(simpleScore('Larry'));


function bonusVowels(str) {
  let vowels = 'aeiou';
  let vCount = 0;
  let consonants = 0;
  str = str.toLowerCase();
  
  for(let i = 0; i < str.length; i++) {
    if(vowels.indexOf(str[i]) !== -1) {
      vCount += 1;
    } else {
      consonants += 1;
    }
  }
  return (vCount * 3) + consonants;
}
//console.log(bonusVowels('larry'));


function scrabbleScore(str, newPointStructure) {
  let score = 0;
  for(let j = 0; j < str.length; j++){
    //console.log(str[j]);
    let strLetters = str[j];
    strLetters = strLetters.toLowerCase();
    score += newPointStructure[strLetters];
  }
  return score;
}
//scrabbleScore("Zox", newPointStructure);


// scoring objects and array below:
let simpleScoreObj = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore
};

let bonusVowelsObj = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt",
  scoreFunction: bonusVowels
};

let scrabbleScoreObj = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scoreFunction: scrabbleScore
};

let scoringAlgorithms = [scrabbleScoreObj, simpleScoreObj, bonusVowelsObj];

// Call the runProgram function here:

runProgram(scoringAlgorithms);
