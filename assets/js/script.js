const $ = document
let currentWord;
let wrongGuessCounter = 0;
let maxWrongGuess = 6;
let correctLettersWithBtn = [];
let usedLetters= [];
let usedCorrectLettersWithKeyboard = [];

const keyboardContainer = $.querySelector('.keyboard-container')
const wordDisplayContainer = $.querySelector('.word-display')
const gussesText = $.querySelector('.gusses-text span')
const hangmanImage = $.querySelector('.gallows img')
const modal = $.querySelector('.game-modal')
const resultAudio = $.querySelector('#resultAudio')


// reset game for play again
const resetGame = () => {
    usedCorrectLettersWithKeyboard = [];
    correctLettersWithBtn = [];
    usedLetters = [];
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
    //enable keyBoard
    document.onkeydown = function (e) {
        return true;
    }
}

//getting random word
const getRandomWord = () => {
    let chosenCategory;
    let randomIndex;
    let randomWord;
    const chosenCategoryFromLocal = localStorage.getItem('chosenTopic')
    let categoryTopics = Object.keys(wordList);
    let indexOfTopic = categoryTopics.indexOf(chosenCategoryFromLocal)
    if(categoryTopics.includes(chosenCategoryFromLocal)) {
        //choose specific topic
        let specificCategory = categoryTopics[indexOfTopic]
        chosenCategory = wordList[specificCategory]
        randomIndex = Math.floor(Math.random() * chosenCategory.length)
        randomWord = chosenCategory[randomIndex];
        currentWord = randomWord.word.toLowerCase();
        $.querySelector('.subject span').innerText = specificCategory;
    }else {
        //choose random topic
        let randomCategory = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
        chosenCategory = wordList[randomCategory];
        randomIndex = Math.floor(Math.random() * chosenCategory.length);
        randomWord = chosenCategory[randomIndex];
        currentWord = randomWord.word.toLowerCase();
        $.querySelector('.subject span').innerText = randomCategory;
    }
    $.querySelector('.hint span').innerText = randomWord.hint;
    resetGame();
}

//function for checking the letters that is existing ot not
const clickedBtn = (btn , clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //checking letter by letter
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLettersWithBtn.push(letter)
                wordDisplayContainer.querySelectorAll("li")[index].innerText = letter;
                wordDisplayContainer.querySelectorAll("li")[index].classList.add('guessed');
            }
        })
    }else {
        wrongGuessCounter++;
        //change gallows with wrong guesses
        hangmanImage.src = `./assets/images/hangman-${wrongGuessCounter}.svg`
        usedLetters.push(clickedLetter)
    }
    gussesText.innerText = `${wrongGuessCounter} / ${maxWrongGuess}`;
    btn.disabled = true;

    if(currentWord.length == correctLettersWithBtn.length) return gameOver(true);
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
    isVictory ? PlayAudio("winner.mp3") : PlayAudio("gameOver.mp3");
    //disable keyboard
    document.onkeydown = function (e) {
        return false;
    }
}

//creating keyboard buttons
for(let i = 97;i <= 122;i++) {
    const btn = $.createElement('button');
    btn.setAttribute('id', String.fromCharCode(i))
    btn.innerText = String.fromCharCode(i);
    keyboardContainer.appendChild(btn)
    btn.addEventListener("click", e => clickedBtn(e.target, String.fromCharCode(i)))
}

//for useing keyboard keys to guess
const getUserKey = (e) => {
    let userKey = e.key.toLowerCase()
    if (usedCorrectLettersWithKeyboard.includes(userKey) || correctLettersWithBtn.includes(userKey)) {
        alert('you selected this word before');
    }else if(usedLetters.includes(userKey)){
        alert('you selected this word before');
    }else {
        usedLetters.push(userKey)
        console.log(usedLetters);
        usedCorrectLettersWithKeyboard.push(userKey);
        let userKeyId = this.document.getElementById(userKey)
        clickedBtn(userKeyId, userKey)
    }
}


//for play audio after the end of the game for result
const PlayAudio = (name) => {
    const audio = new Audio(`../../assets/music/${name}`);
    audio.play();
};


getRandomWord()
window.addEventListener('keypress', getUserKey)
modal.querySelector('button').addEventListener('click', getRandomWord)