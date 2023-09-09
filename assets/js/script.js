const $ = document

const keyboardContainer = $.querySelector('.keyboard-container')

for(let i = 97;i <= 122;i++) {
    const btn = $.createElement('button');
    btn.innerText = String.fromCharCode(i);
    keyboardContainer.appendChild(btn)
}