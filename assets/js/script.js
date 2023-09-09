const $ = document
let currentWord;
let wrongGuessCounter = 0;
let maxWrongGuess = 6;

const keyboardContainer = $.querySelector('.keyboard-container')
const wordDisplayContainer = $.querySelector('.word-display')
const gussesText = $.querySelector('.gusses-text span')

//getting random word
const getRandomWord = () => {
    let categoryTopics = Object.keys(wordList);
    let randomCategory = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
    let chosenCategory = wordList[randomCategory];
    let randomIndex = Math.floor(Math.random() * chosenCategory.length);
    let randomWord = chosenCategory[randomIndex];
    currentWord = randomWord.word.toLowerCase();
    console.log(currentWord);
    $.querySelector('.hint span').innerText = randomWord.hint;
    $.querySelector('.subject span').innerText = randomCategory;
    wordDisplayContainer.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
}

//function for checking the letters that is existing ot not
const clickedBtn = (btn , clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //checking letter by letter
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                wordDisplayContainer.querySelectorAll("li")[index].innerText = letter;
                wordDisplayContainer.querySelectorAll("li")[index].classList.add('guessed');
            }
        })
    }else {
        wrongGuessCounter++;
    }
    gussesText.innerText = `${wrongGuessCounter} / ${maxWrongGuess}`;
    btn.disabled = true;
}

//creating keyboard buttons
for(let i = 97;i <= 122;i++) {
    const btn = $.createElement('button');
    btn.innerText = String.fromCharCode(i);
    keyboardContainer.appendChild(btn)
    btn.addEventListener("click", e => clickedBtn(e.target, String.fromCharCode(i)))
}

getRandomWord()