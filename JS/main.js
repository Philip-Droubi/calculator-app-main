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

let herf = window.location.host;
let screenOutput = document.querySelector('.screen .output');
let screen = document.querySelector('.screen');
let scrollBarVisible = false;
let themeWork = true;
let soundOn = false;
let acceptedBtns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', '.', 'Enter', '=', 'Delete', 'Backspace'];

if (window.innerHeight < parseInt(getComputedStyle(document.body).height)) {
    document.body.style.setProperty('min-height', `${window.innerHeight}px`);
}// this condition will fix the body height for some mobile devices.
screenScroll();

function screenScroll() {
    if (screenOutput.scrollWidth >= (screen.clientWidth - 64) && !scrollBarVisible) {
        screenOutput.style.overflowX = 'scroll';
        scrollBarVisible = true;
    } else if (screenOutput.scrollWidth < (screen.clientWidth - 64) && scrollBarVisible) {
        screenOutput.style.overflowX = 'hidden';
        scrollBarVisible = false;
    }
    if (scrollBarVisible) {
        screenOutput.scrollTo(100000, 0);
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
            document.querySelector('.ctc').style.filter = 'invert()'
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
            document.querySelector('.ctc').style.filter = 'none'
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
            document.querySelector('.ctc').style.filter = 'invert()'
            break;
        default:
            break;
    }
    moveBall(mode);
}

//Copy To ClipBoard

let msg = document.querySelector('.copyMsg');
let msgTimer;
function copyToClipBoard() {
    let copyText = screenOutput.textContent;
    navigator.clipboard.writeText(copyText);
    msg.style.opacity = '0.94';
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => {
        msg.style.opacity = '0';
    }, 1500)
}

//React with keypad

window.addEventListener('keydown', e => clickBtn(e));
window.addEventListener('keyup', e => endClickBtn(e));
// window.addEventListener('touchstart', e => testTouch(e));
// window.addEventListener('touchend', e => endMouseClick(e));
// window.addEventListener('touchcancel', e => endMouseClick(e));
window.addEventListener('mousedown', e => mouseClick(e.target));
// window.addEventListener('touchstart', e => touchClick(e.target));
window.addEventListener('mouseup', e => endMouseClick(e.target));
window.addEventListener('mouseout', e => e.target.classList.remove('clicked'));

function clickBtn(e) {
    let key = e.key;
    if (acceptedBtns.includes(key)) {
        playSound();
        key == '=' ? key = 'Enter' : key;
        let ele = document.getElementById(`${key}`);
        if (ele) ele.classList.add('clicked');
        handleInput(key);
    }
    key == 'm' || key == 'ArrowRight'
        || key == 'ArrowLeft'
        || key == 'ArrowUp'
        || key == 'ArrowDown'
        || key == 'PageUp'
        || key == 'PageDown'
        || key == 't'
        || key == 'T' ? changeThemeByKey() : null;
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
        playSound();
    }
}

function endMouseClick(ele) {
    if (window.matchMedia("(pointer: coarse)").matches) {
        setTimeout(() => {
            ele.classList.remove('clicked');
        }, 240);
    } else {
        ele.classList.remove('clicked');
    }
    soundOn = false;
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, true);
    try {
        http.send();
        if (http.status != 404)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function playSound() {
    if (!soundOn) {
        let url;
        if (herf == 'philip-droubi.github.io') {
            url = '/calculator-app-main/sounds/click.mp3'
            // if (UrlExists(url)) {
            btnSound = new Audio(url);
            // }
        } else {
            btnSound = new Audio('../sounds/click.mp3');
        }
        btnSound.play();
        soundOn = true;
    }
}

// LOGIC

let calculatorButtons = document.querySelectorAll('.calculatorBody ul li button');
let outputEle = document.querySelector('.output');

const syms = ['+', '-', '*', '/']; //symbols
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keys = ['Enter', '=', 'Delete', 'Backspace'];
let dot = '.';

calculatorButtons.forEach(btn => {
    btn.addEventListener('click', e => handleInput(btn.id));
});

let lastSymbolPosition;
let lastCommaPosition = 1;
let lastCommaPositionBackup = 1;
function handleInput(key) {
    let outputString = outputEle.textContent;
    if (outputString.length <= 200 && !(keys.includes(key)) || (keys.includes(key))) {
        // handle Symbols
        if (syms.includes(key)) {
            outputString = handleSymbols(outputString, key);
        }
        // handle Numbers
        else if (nums.includes(key)) {
            lastCommaPositionBackup = lastCommaPosition;
            if (outputString[0] == 0 && outputString.length == 1 && key != '.') {
                outputString = outputString.replace(/.$/, key);
                lastCommaPosition--;
            } else if (outputString.charAt(lastSymbolPosition + 1) == '0' && !outputString.charAt(lastSymbolPosition + 2) == '.'
                || outputString.charAt(lastSymbolPosition + 1) == '0' && !outputString.charAt(lastSymbolPosition + 2) == '.' && nums.includes(key)
                || outputString.charAt(outputString.length - 1) == "0" && outputString.charAt(outputString.length - 2) == " ") {
                outputString = outputString.replace(/.$/, key);
                lastCommaPosition--;
            } else if (syms.includes(outputString.charAt(outputString.length - 1))) {
                outputString = outputString + ` ${key}`;
            } else if (lastCommaPosition >= 3) {
                outputString = outputString + `,${key}`;
                lastCommaPosition = 0;
            } else
                outputString = outputString + `${key}`;
        }
        //handle dot
        else if (key == '.' && !(outputString.substring(lastSymbolPosition, outputString.length + 1).includes('.'))) {
            lastCommaPositionBackup = lastCommaPosition;
            if (syms.includes(outputString.charAt(outputString.length - 1)))
                outputString = outputString + ` 0${key}`;
            else
                outputString = outputString + `${key}`;
            lastCommaPosition = -1;
        }
        // handle Keys (Enter, =, Backspace, Delete)
        else if (keys.includes(key)) {
            switch (key) {
                case 'Enter':
                case '=':
                    break;
                case 'Backspace':
                    if (outputString.length == 1) {
                        outputString = outputString.replace(/.$/, 0);
                        lastCommaPosition = 0;
                    }
                    else if (outputString.length > 1) {
                        if (syms.includes(outputString.charAt(outputString.length - 1))) {
                            outputString = outputString.substring(0, outputString.length - 2);
                            lastCommaPosition = lastCommaPositionBackup;
                        } else if (outputString.charAt(outputString.length - 2) != ',') {
                            outputString = outputString.substring(0, outputString.length - 1);
                            lastCommaPosition = lastCommaPositionBackup - 1;
                        } else {
                            outputString = outputString.substring(0, outputString.length - 2);
                            lastCommaPosition = lastCommaPositionBackup;
                        }
                    }
                    break;
                case 'Delete':
                    outputString = '0';
                    lastCommaPosition = 0;
                    break;
                default:
                    break;
            }
        }
        outputEle.textContent = outputString;
        lastCommaPosition++;
        screenScroll();
    } else {
        preventInput();
    }
}

function handleSymbols(outputString, key) {
    if (syms.includes(outputString.charAt(outputString.length - 1))) { //if the last char is symbol
        outputString = outputString.replace(/.$/, key);
    } else if (outputString.charAt(outputString.length - 1) == '.') { //last char is dot
        outputString = outputString.replace(/.$/, ` ${key}`)
    } else {
        outputString = outputString + ` ${key}`;
    }
    lastCommaPosition = -1;
    lastSymbolPosition = outputString.length;
    return outputString;
}

let prevent = document.querySelector('.preventInput');
let timer;
function preventInput() {
    prevent.style.opacity = '0.94';
    prevent.style.zIndex = '500';
    clearTimeout(timer);
    timer = setTimeout(() => {
        prevent.style.opacity = '0';
        prevent.style.zIndex = '-1';
    }, 1800);
}