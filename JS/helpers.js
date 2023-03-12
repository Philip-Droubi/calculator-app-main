import { handleInput } from './logic.js';
import { changeThemeByKey } from './themeController.js';

let screenOutput = document.querySelector('.screen .output');
let scrollBarVisible = false;
let screen = document.querySelector('.screen');
let msg = document.querySelector('.copyMsg');
let msgTimer;
let soundOn = false;
let herf = window.location.host;
let btnSound;
let acceptedBtns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', '.', 'Enter', '=', 'Delete', 'Backspace'];

export function screenScroll() {
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

export function copyToClipBoard() {
    let copyText = screenOutput.textContent;
    navigator.clipboard.writeText(copyText);
    msg.style.opacity = '0.94';
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => {
        msg.style.opacity = '0';
    }, 1500);
}

export function playSound() {
    if (!soundOn) {
        let url;
        if (herf == 'philip-droubi.github.io') {
            url = '/calculator-app-main/sounds/click.mp3'
            btnSound = new Audio(url);
        } else {
            btnSound = new Audio('../sounds/click.mp3');
        }
        btnSound.play();
        soundOn = true;
    }
}

export function forceSoundOff() {
    soundOn = false;
}

export function clickBtn(e) {
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
    key == 'c' ? copyToClipBoard() : null;
}

export function endClickBtn(e) {
    forceSoundOff()
    let key = e.key;
    key == '=' ? key = 'Enter' : key;
    let ele = document.getElementById(`${key}`);
    if (ele) ele.classList.remove('clicked');
}

export function mouseClick(ele) {
    if (ele.tagName == 'BUTTON' && ele.id != 'themeSwitcher') {
        ele.classList.add('clicked');
        playSound();
    }
}

export function endMouseClick(ele) {
    if (window.matchMedia("(pointer: coarse)").matches) {
        setTimeout(() => {
            ele.classList.remove('clicked');
        }, 240);
    } else {
        ele.classList.remove('clicked');
    }
    forceSoundOff()
}