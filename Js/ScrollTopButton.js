// Start of the script
var topbutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()}; //Page scrolling EventListener

//If scrolling below enough, the return to top button will be displayed.
function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

// Button click returns user to the top of the page
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}