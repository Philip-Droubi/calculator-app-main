// ControlScrollBar

let screenOutput = document.querySelector('.screen .output');
let screen = document.querySelector('.screen');
let scrollBarVisible = false;

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

// ControlColors

let themeSwitch = document.querySelector('.switch button');
let ball = document.querySelector('.ball');
let root = document.querySelector(':root');
let mode = 1

themeSwitch.addEventListener('click', () => {
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
});

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

if (window.innerHeight < parseInt(getComputedStyle(document.body).height)) {
    document.body.style.setProperty('min-height', `${window.innerHeight}px`);
}// this condition will fix the body height for some mobile devices.