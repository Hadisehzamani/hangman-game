const $ = document
let currentWord;
let wrongGuessCounter = 0;
let maxWrongGuess = 6;
let correctLetters = [];

const keyboardContainer = $.querySelector('.keyboard-container')
const wordDisplayContainer = $.querySelector('.word-display')
const gussesText = $.querySelector('.gusses-text span')
const hangmanImage = $.querySelector('.gallows img')
const modal = $.querySelector('.game-modal')


// reset game for play again
const resetGame = () => {
    correctLetters = [];
    wrongGuessCounter = 0;
    hangmanImage.src = './assets/images/hangman-0.svg'
    gussesText.innerText = `${wrongGuessCounter} / ${maxWrongGuess}`
    wordDisplayContainer.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardContainer.querySelectorAll('button').forEach((btn) => {
        btn.disabled = false;
        btn.style.cursor = 'pointer'
    })
    modal.classList.remove('show')
    $.querySelector('.container').style.filter = 'blur(0px)'
}

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
    resetGame();
}

//function for checking the letters that is existing ot not
const clickedBtn = (btn , clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //checking letter by letter
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplayContainer.querySelectorAll("li")[index].innerText = letter;
                wordDisplayContainer.querySelectorAll("li")[index].classList.add('guessed');
            }
        })
    }else {
        wrongGuessCounter++;
        //change gallows with wrong guesses
        hangmanImage.src = `./assets/images/hangman-${wrongGuessCounter}.svg`
    }
    gussesText.innerText = `${wrongGuessCounter} / ${maxWrongGuess}`;
    btn.disabled = true;

    if(currentWord.length == correctLetters.length) return gameOver(true);
    if(wrongGuessCounter == maxWrongGuess) return gameOver(false);
}

//showing modal with relevant details
const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    modal.querySelector("img").src = `./assets/images/${isVictory ? 'victory' : 'lost'}.gif`;
    modal.querySelector("h1").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    modal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    modal.classList.add("show");
    $.querySelector('.container').style.filter = 'blur(6px)'
    keyboardContainer.querySelectorAll('button').forEach((btn) => {
        btn.disabled = true;
        btn.style.cursor = 'default'
    })
}

//creating keyboard buttons
for(let i = 97;i <= 122;i++) {
    const btn = $.createElement('button');
    btn.innerText = String.fromCharCode(i);
    keyboardContainer.appendChild(btn)
    btn.addEventListener("click", e => clickedBtn(e.target, String.fromCharCode(i)))
}



getRandomWord()
modal.querySelector('button').addEventListener('click', getRandomWord)