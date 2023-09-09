const $ = document

const keyboardContainer = $.querySelector('.keyboard-container')
const wordDisplayContainer = $.querySelector('.word-display')

//getting random word
const getRandomWord = () => {
    let categoryTopics = Object.keys(wordList);
    let randomCategory = categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
    let chosenCategory = wordList[randomCategory];
    let randomIndex = Math.floor(Math.random() * chosenCategory.length);
    let randomWord = chosenCategory[randomIndex];
    $.querySelector('.hint span').innerText = randomWord.hint;
    $.querySelector('.subject span').innerText = randomCategory;
    wordDisplayContainer.innerHTML = randomWord.word.split("").map(() => `<li class="letter"></li>`).join("")
}


//creating keyboard buttons
for(let i = 97;i <= 122;i++) {
    const btn = $.createElement('button');
    btn.innerText = String.fromCharCode(i);
    keyboardContainer.appendChild(btn)
}

getRandomWord()