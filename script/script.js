// * add pop-up text 'password copied'
// * decrease font-size of output if it has more than 16 symbols
//  and also make it lower if output has more than 21 symbols





// Navbar

const toggle = document.querySelector('.toggle-button');
const navDiv = document.querySelector('.navbar');
const navUL = document.querySelector('.navbar__links-list');

toggle.addEventListener('click', () => {
   navDiv.classList.toggle('active');
   navUL.classList.toggle('active');
   toggle.classList.toggle('active')
});

// Password Generator

//  * * * VARIABLES * * *

const output = document.querySelector('.pg-password');
const generateButtonElement = document.querySelector('.generate-btn');
const copyButtonElement = document.querySelector('.pg-output--copyBtn');
const lengthElement = document.querySelector('#length');
const lowersElement = document.querySelector('#lower');
const uppersElement = document.querySelector('#upper');
const numbersElement = document.querySelector('#number');
const symbolsElement = document.querySelector('#symbol');

// - - - - - - - - - - - - -

// Event Listeners for buttons (generate and copy to clipboard)

generateButtonElement.addEventListener('click', () => {

   const length = lengthElement.value;
   const lowersContains = lowersElement.checked;
   const uppersContains = uppersElement.checked;
   const numbersContains = numbersElement.checked;
   const symbolsContains = symbolsElement.checked;

   output.innerText = generatePassword(
      lowersContains,
      uppersContains,
      numbersContains,
      symbolsContains,
      length
   )

})

copyButtonElement.addEventListener('click', () => {

   const password = output.innerText;
   const textarea = document.createElement('textarea');

   if (!password) {
      return
   }

   document.body.appendChild(textarea);
   textarea.value = output.innerText;
   textarea.select();
   document.execCommand('copy');
   document.body.removeChild(textarea)
   alert(`password copied: ${password}`)

})

// Generator
function generatePassword(lowers, uppers, numbers, symbols, length) {
   let generatedPassword = '';

   let howMuchTypes = lowers + uppers + numbers + symbols;
   // console.log(`how much types: ${howMuchTypes}`);


   if (howMuchTypes === 0 || length > 25) {
      return generatedPassword
   }
   if (length >= 12 && length <= 17) {
      output.style.fontSize = '1.3rem';
   } else if (length >= 18) {
      output.style.fontSize = '0.9rem';
   } else
      output.style.fontSize = '1.5rem';

   const checkedConditions = conditionChecker(lowers, uppers, numbers, symbols);

   for (let i = 0; i < length; i++) {

      generatedPassword += randomOperation(checkedConditions)();
   }

   console.log(generatedPassword.length >= 16, generatedPassword.length)

   return generatedPassword
}


// Supporting functions
function conditionChecker(low, up, num, symb) {
   const checkedConditions = [];
   if (low) checkedConditions.push(getRandomLower);
   if (up) checkedConditions.push(getRandomUpper);
   if (num) checkedConditions.push(getRandomNumber);
   if (symb) checkedConditions.push(getRandomSymbol);
   return checkedConditions;
}

function randomOperation(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

// Functions to get random char

function getRandomLower() {
   let lowercase = charCreator(97, 122);
   return lowercase[Math.floor(Math.random() * lowercase.length)];
}

function getRandomUpper() {
   let uppercase = charCreator(65, 90);
   return uppercase[Math.floor(Math.random() * uppercase.length)];
}

function getRandomNumber() {
   let number = charCreator(48, 57);
   return number[Math.floor(Math.random() * number.length)];

}

function getRandomSymbol() {
   let symbols = `!#$%^&*()_-+=:;"',.?/`;
   return symbols[Math.floor(Math.random() * symbols.length)];
}

// Character creator function (for lower- uppercase and numbers)

function charCreator(start, end) {
   let result = '';
   for (let i = start; i <= end; i++) result += String.fromCharCode(i);
   return result
}

// - - - - - - - - - - - - -


