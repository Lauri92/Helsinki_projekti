//  Start of the script
const finnnish = document.getElementById("finnish");
const english = document.getElementById("english");
const otsikko = document.getElementById("paaotsikko");



finnnish.addEventListener("click", fin);
english.addEventListener("click", eng);

function fin() {
    nappi.innerHTML = "Hae aktiviteettia";
    otsikko.innerHTML = "Etsi Helsingistä";
}

function eng() {
    nappi.innerHTML = "Search activity";
    otsikko.innerHTML = "Search Helsinki";
}