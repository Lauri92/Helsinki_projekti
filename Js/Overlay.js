'use strict';

//  Start of the script
const body = document.getElementsByTagName("body")[0];
const nappi7 = document.getElementById("nappi7");
const overlay = document.getElementById("overlay");
nappi7.addEventListener("click", on);
overlay.addEventListener("click", off);


function on() {
    overlay.style.display = "block";
    body.className = "overlay_hidden";
}

function off() {
    overlay.style.display = "none";
    body.className = "overlay_show";
}
