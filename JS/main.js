import { handleInput } from './logic.js';
import * as helper from './helpers.js';
import { changeTheme, changeThemeByKey } from './themeController.js';

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
let themeSwitch = document.querySelector('.switch button');
helper.screenScroll();

if (window.innerHeight < parseInt(getComputedStyle(document.body).height)) {
    document.body.style.setProperty('min-height', `${window.innerHeight}px`);
}// this condition will fix the body height for some mobile devices.

window.addEventListener('keypress', e => {
    if (e.key == 'Enter') e.preventDefault();
});//this is needed because if u change theme then press ENTER it will change the theme again.

// Control Themes
themeSwitch.addEventListener('click', changeTheme);

//Copy To ClipBoard
document.querySelector('.ctc').addEventListener('click', helper.copyToClipBoard);

//React with keypad
window.addEventListener('keydown', e => helper.clickBtn(e));
window.addEventListener('keyup', e => helper.endClickBtn(e));
window.addEventListener('mousedown', e => helper.mouseClick(e.target));
window.addEventListener('mouseup', e => helper.endMouseClick(e.target));
window.addEventListener('mouseout', e => e.target.classList.remove('clicked'));

let calculatorButtons = document.querySelectorAll('.calculatorBody ul li button');
calculatorButtons.forEach(btn => {
    btn.addEventListener('click', e => handleInput(btn.id));
});