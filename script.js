// import {Howl, Howler} from 'howler';
// const {Howl, Howler} = require('howler');
// // let sound = new Howl({
// //     src: ['sound.mp3']
// // });
//
// sound.play();

const newColorBtn = document.getElementById('color-btn');
const heading = document.getElementById('rgb');
const easyBtn = document.getElementById('easy-btn');
const hardContainer = document.getElementById('hard-container');
const hardBtn = document.getElementById('hard-btn');
const colorSquares = document.getElementsByClassName('square');
const parentContainer = document.getElementById('square-parent-container');
const container = document.getElementById('container');
const square = container.querySelectorAll(".square");
const subheading = document.getElementById('sub-heading');



const rgb = () => {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s)  + ','+ ' ' + o(r()*s) + ','+ ' ' + o(r()*s)  + ')';

};

const setStoredColor = () => {
    const rgba = rgb();

    heading.textContent = rgba;
    localStorage.setItem('storedColor', JSON.stringify(rgba));
    return rgba;
};

const getStoredColor = () => {
    return JSON.parse(localStorage.getItem('storedColor'));
};

const initializeGame = () => {
    let storedColor = getStoredColor();

    if (!storedColor) {
        storedColor = setStoredColor();
    }
    console.log(parentContainer.contains(hardContainer));

if(parentContainer.contains(hardContainer)? colorSquares.length === 6 : colorSquares.length === 3){
    console.log(colorSquares.length);
    const sameColorIndex = Math.floor(Math.random() * colorSquares.length);
    for (let i = 0; i < colorSquares.length; i++) {
        colorSquares[i].style.backgroundColor = (i === sameColorIndex) ? storedColor : rgb();
    }
}
    heading.textContent = storedColor;
};


const newColors = (e) => {
    heading.style.color='white';
    setStoredColor();
    initializeGame();
    if(newColorBtn.textContent === 'Play Again?'){
        newColorBtn.textContent = "NEW COLORS"
        initializeGame();

    }
}
// const easyGame = () => {
//     let storedColor = getStoredColor();
//
//     if (!storedColor) {
//         storedColor = setStoredColor();
//     }
//
//     const sameColorIndex = Math.floor(Math.random() * 3);
//
//     for (let i = 0; i < 3; i++) {
//         colorSquares[i].style.backgroundColor = (i === sameColorIndex) ? storedColor : rgb();
//     }
//
//     heading.textContent = storedColor;
// }
const easyButton = (e) => {
    if(e.target.classList.contains('easy-btn')){
        hardContainer.remove();
        newColors();
    }
}
const hardButton = (e) => {
    if (e.target.classList.contains('hard-btn') ) {
        parentContainer.appendChild(hardContainer);
        newColors();

    }
}

const selectSquare = (e) => {
    let storedColor = getStoredColor();



    if (e.target.style.backgroundColor === storedColor ) {
        for (let i = 0; i < square.length; i++) {
            square[i].style.backgroundColor = storedColor;
        }
        heading.style.color = storedColor;
        newColorBtn.textContent = "Play Again?"
    }

    else {
        e.target.style.backgroundColor='grey';
    }
}
// let sound = new Howl({
//     src: ['sound.webm', 'sound.mp3', 'sound.wav'],
//     autoplay: true,
//     loop: true,
//     volume: 0.5,
//     onend: function() {
//         console.log('Finished!');
//     }
// });

newColorBtn.addEventListener("click", newColors)
easyBtn.addEventListener('click', easyButton)
hardBtn.addEventListener('click',hardButton)
document.addEventListener('DOMContentLoaded',initializeGame)
parentContainer.addEventListener('click',selectSquare)
