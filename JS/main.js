//PWA

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/calculator-app-main/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    });
}

// ControlScrollBar + init

let screenOutput = document.querySelector('.screen .output');
let screen = document.querySelector('.screen');
let scrollBarVisible = false;
let themeWork = true;
// let btnSound = new Audio('../sounds/click.mp3');
let soundOn = false;
let acceptedBtns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', '.', 'Enter', '=', 'Delete', 'Backspace'];

if (window.innerHeight < parseInt(getComputedStyle(document.body).height)) {
    document.body.style.setProperty('min-height', `${window.innerHeight}px`);
}// this condition will fix the body height for some mobile devices.
screenScroll();

function screenScroll() {
    if (screenOutput.clientWidth >= (screen.clientWidth * 88.1481 / 100) && !scrollBarVisible) {
        screenOutput.style.overflowX = 'scroll';
        scrollBarVisible = true;

    } else if (screenOutput.clientWidth < (screen.clientWidth * 88.1481 / 100) && scrollBarVisible) {
        screenOutput.style.overflowX = 'hidden';
        scrollBarVisible = false;
    }
}

window.addEventListener('keypress', e => {
    if (e.key == 'Enter') e.preventDefault();
});//this is needed because if u change theme then press ENTER it will change the theme again.

// Control Themes

let themeSwitch = document.querySelector('.switch button');
let ball = document.querySelector('.ball');
let root = document.querySelector(':root');
let mode = 1

themeSwitch.addEventListener('click', changeTheme);

function moveBall(mode) {
    switch (mode) {
        case 1:
        case 0:
            ball.style.left = '4px';
            ball.style.transform = 'translateX(0)';
            break;
        case 2:
            ball.style.left = '50%';
            ball.style.transform = 'translateX(-50%)';
            break;
        case 3:
            ball.style.left = 'calc(100% - 20px)';
            ball.style.transform = 'translateX(0)';
            break;
        default:
            break;
    }
}

function changeTheme() {
    mode++;
    if (mode == 4) mode = 1;
    switch (mode) {
        case 1:
            root.style.setProperty('--background-color', ' var(--Very-dark-desaturated-blue-main-background)');
            root.style.setProperty('--nav-screen-text-color', 'var(--White)');
            root.style.setProperty('--toggle-background-keypad', 'var(--Very-dark-desaturated-blue-toggle-background-keypad-background)');
            root.style.setProperty('--equall-ball-background', 'var(--Red-key-background-toggle)');
            root.style.setProperty('--equall-shadow-color', 'var(--Dark-red-key-shadow)');
            root.style.setProperty('--screen-background', 'var(--Very-dark-desaturated-blue-screen-background)');
            root.style.setProperty('--nums-color', 'var(--Very-dark-grayish-blue)');
            root.style.setProperty('--nums-background', 'var(--Light-grayish-orange-key-background)');
            root.style.setProperty('--nums-shadow', 'var(--Grayish-orange-key-shadow)');
            root.style.setProperty('--reset-del-background', 'var(--Desaturated-dark-blue-key-background)');
            root.style.setProperty('--reset-del-shadow', 'var(--Desaturated-dark-blue-key-shadow)');
            break;
        case 2:
            root.style.setProperty('--background-color', ' var(--Light-gray-main-background)');
            root.style.setProperty('--nav-screen-text-color', 'var(--Very-dark-grayish-yellow)');
            root.style.setProperty('--toggle-background-keypad', 'var(--Grayish-red-toggle-background-keypad-background)');
            root.style.setProperty('--equall-ball-background', 'var(--Orange-key-background-toggle)');
            root.style.setProperty('--equall-shadow-color', 'var(--Dark-orange-key-shadow)');
            root.style.setProperty('--screen-background', 'var(--Very-light-gray-screen-background)');
            root.style.setProperty('--nums-color', 'var(--Very-dark-grayish-yellow)');
            root.style.setProperty('--nums-background', 'var(--Light-grayish-yellow-key-background)');
            root.style.setProperty('--nums-shadow', 'var(--Dark-grayish-orange-key-shadow)');
            root.style.setProperty('--reset-del-background', 'var(--Dark-moderate-cyan-key-background)');
            root.style.setProperty('--reset-del-shadow', 'var(--Very-dark-cyan-key-shadow)');
            break;
        case 3:
            root.style.setProperty('--background-color', ' var(--Very-dark-violet-main-background)');
            root.style.setProperty('--nav-screen-text-color', 'var(--Light-yellow)');
            root.style.setProperty('--toggle-background-keypad', 'var(--Very-dark-violet-toggle-background-keypad-background-screen-background)');
            root.style.setProperty('--equall-ball-background', 'var(--Pure-cyan-key-background-toggle)');
            root.style.setProperty('--equall-shadow-color', 'var(--Soft-cyan-key-shadow)');
            root.style.setProperty('--screen-background', 'var(--Very-dark-violet-toggle-background-keypad-background-screen-background)');
            root.style.setProperty('--nums-color', 'var(--Light-yellow)');
            root.style.setProperty('--nums-background', 'var(--Very-dark-violet-key-background)');
            root.style.setProperty('--nums-shadow', 'var(--Dark-magenta-key-shadow)');
            root.style.setProperty('--reset-del-background', 'var(--Dark-violet-key-background)');
            root.style.setProperty('--reset-del-shadow', 'var(--Vivid-magenta-key-shadow)');
            break;
        default:
            break;
    }
    moveBall(mode);
}

//React with keypad

window.addEventListener('keydown', e => clickBtn(e));
window.addEventListener('keyup', e => endClickBtn(e));
window.addEventListener('touchstart', e => clickBtn(e));
window.addEventListener('touchend', e => endClickBtn(e));
window.addEventListener('touchcancel', e => endClickBtn(e));
window.addEventListener('mousedown', e => mouseClick(e.target));
window.addEventListener('mouseup', e => e.target.classList.remove('clicked'));
window.addEventListener('mouseout', e => e.target.classList.remove('clicked'));

function clickBtn(e) {
    let key = e.key;
    if (acceptedBtns.includes(key)) {
        if (!soundOn) {
            let btnSound = new Audio('../sounds/click.mp3');
            btnSound.play();
            soundOn = true;
        }
        key == '=' ? key = 'Enter' : key;
        let ele = document.getElementById(`${key}`);
        if (ele) ele.classList.add('clicked');
        key == 'm' || key == 'ArrowRight'
            || key == 'ArrowLeft'
            || key == 'ArrowUp'
            || key == 'ArrowDown'
            || key == 'PageUp'
            || key == 'PageDown'
            || key == 't'
            || key == 'T' ? changeThemeByKey() : null;
    }
}

function changeThemeByKey() {
    if (themeWork) {
        themeWork = false;
        releseTheme();
        changeTheme();
    }
}

function releseTheme() {
    setTimeout(() => {
        themeWork = true
    }, 250)
}

function endClickBtn(e) {
    soundOn = false;
    let key = e.key;
    key == '=' ? key = 'Enter' : key;
    let ele = document.getElementById(`${key}`);
    if (ele) ele.classList.remove('clicked');
}

function mouseClick(ele) {
    if (ele.tagName == 'BUTTON' && ele.id != 'themeSwitcher') {
        ele.classList.add('clicked');
        btnSound.play();
    }
}

// LOGIC
