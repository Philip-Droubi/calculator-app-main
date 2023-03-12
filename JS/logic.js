import * as helper from './helpers.js';

let outputEle = document.querySelector('.output');
const syms = ['+', '-', '*', '/']; //symbols
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keys = ['Enter', '=', 'Delete', 'Backspace'];
let dot = '.';
let prevent = document.querySelector('.preventInput');
let timer;

let lastSymbolPosition;

export function handleInput(key) {
    let outputString = outputEle.textContent;
    if (outputString.length <= 200 && !(keys.includes(key)) || (keys.includes(key))) {
        // handle Symbols
        if (syms.includes(key)) {
            outputString = handleSymbols(outputString, key);
        }
        // handle Numbers
        else if (nums.includes(key)) {
            outputString = handleNums(outputString, key);
        }
        //handle dot
        else if (key == '.' && !(outputString.substring(lastSymbolPosition, outputString.length + 1).includes('.'))) {
            outputString = handleDot(outputString);
        }
        // handle Keys (Enter, =, Backspace, Delete)
        else if (keys.includes(key)) {
            outputString = handleKeys(outputString, key);
        }
        outputEle.textContent = outputString;
        helper.screenScroll();
    } else {
        preventInput();
    }
}

function handleSymbols(outputString, key) {
    if (outputString.length == 1 && outputString[0] == 0 && (key == '+' || key == '-')) {
        outputString = outputString.replace(/.$/, key);
    } else if (syms.includes(outputString.charAt(outputString.length - 1))) { //if the last char is symbol
        outputString = outputString.replace(/.$/, key);
    } else if (outputString.charAt(outputString.length - 1) == '.') { //last char is dot
        outputString = outputString.replace(/.$/, ` ${key}`)
    } else {
        outputString = outputString + ` ${key}`;
    }
    lastSymbolPosition = outputString.length;
    return outputString;
}

function handleNums(outputString, key) {
    if (outputString[0] == 0 && outputString.length == 1 && key != '.') {
        outputString = outputString.replace(/.$/, key);
    } else if (outputString.charAt(lastSymbolPosition + 1) == '0' && !outputString.charAt(lastSymbolPosition + 2) == '.'
        || outputString.charAt(lastSymbolPosition + 1) == '0' && !outputString.charAt(lastSymbolPosition + 2) == '.' && nums.includes(key)
        || outputString.charAt(outputString.length - 1) == "0" && outputString.charAt(outputString.length - 2) == " ") {
        outputString = outputString.replace(/.$/, key);
    } else if (syms.includes(outputString.charAt(outputString.length - 1))) {
        outputString = outputString + ` ${key}`;
    } else
        outputString = outputString + `${key}`;
    if (lastSymbolPosition) {
        let oldString = outputString.substring(0, lastSymbolPosition + 1);
        let newString = outputString.substring(lastSymbolPosition + 1, outputString.length + 1);
        return oldString + handleComma(newString);
    } else {
        return handleComma(outputString);
    }
}

function handleDot(outputString, key = '.') {
    if (syms.includes(outputString.charAt(outputString.length - 1)))
        outputString = outputString + ` 0${key}`;
    else
        outputString = outputString + `${key}`;
    return outputString;
}

function handleKeys(outputString, key) {
    switch (key) {
        case 'Enter':
        case '=':
            if (syms.includes(outputString.charAt(outputString.length - 1))) {
                outputString = outputString.substring(0, outputString.length - 1);
            }
            let result = `${eval(outputString.replace(/,/g, '')).toString()}`;
            result = handleComma(result);
            lastSymbolPosition = 0;
            return result;
            break;
        case 'Backspace':
            if (outputString.length == 1) {
                outputString = outputString.replace(/.$/, 0);
            }
            else if (outputString.length > 1) {
                if (syms.includes(outputString.charAt(outputString.length - 1))) {
                    outputString = outputString.substring(0, outputString.length - 2);
                    fixLastSymbolPosition(outputString);
                } else if (syms.includes(outputString.charAt(outputString.length - 2))) {
                    outputString = outputString.substring(0, outputString.length - 3);
                    fixLastSymbolPosition(outputString);
                } else if (outputString.charAt(outputString.length - 2) != ',') {
                    outputString = outputString.substring(0, outputString.length - 1);
                } else {
                    outputString = outputString.substring(0, outputString.length - 2);
                }
                if (outputString.length <= 0) {
                    outputString = '0';
                }
            }
            break;
        case 'Delete':
            outputString = '0';
            break;
        default:
            break;
    }
    return outputString;
}

function fixLastSymbolPosition(outputString) {
    let last = 0;
    syms.forEach(e => {
        last < outputString.lastIndexOf(e) ? last = outputString.lastIndexOf(e) : null;
    });
    lastSymbolPosition = last;
    console.log(lastSymbolPosition);
}

/**
 * 
 * @param {String} outputString 
 */
function handleComma(outputString) {
    let comma = 0;
    outputString = outputString.replace(/,/g, '');
    let newOutputString = outputString.substring(0, outputString.lastIndexOf('.') > 0 ? outputString.lastIndexOf('.') : outputString.length + 1);
    newOutputString = reverseString(newOutputString);
    for (let i = 0; i < newOutputString.length; i++) {
        if (comma == 3) {
            newOutputString = newOutputString.slice(0, i) + ',' + newOutputString.slice(i);
            comma = 0;
            i++;
        } comma++;
    }
    return reverseString(newOutputString) + outputString.substring(outputString.lastIndexOf('.') > 0 ? outputString.lastIndexOf('.') : outputString.length);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function preventInput() {
    prevent.style.opacity = '0.94';
    prevent.style.zIndex = '500';
    clearTimeout(timer);
    timer = setTimeout(() => {
        prevent.style.opacity = '0';
        prevent.style.zIndex = '-1';
    }, 1800);
}