"use strict";
let strings = ['spring', 'may', 'lake', 'a', 'ab'];

function computeNewStrings() {
    strings = strings.map((string) => {
        if (string.length < 2) {
            return '';
        } else {
            return string.slice(0, 2) + string.slice(string.length - 2);
        }
    });
}

console.log(strings);
computeNewStrings();
console.log(strings);