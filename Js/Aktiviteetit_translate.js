function fin() {
    const otsikko = document.getElementById("paaotsikko");
    otsikko.innerHTML = "Etsi Helsingistä";
}

function eng() {
    const otsikko = document.getElementById("paaotsikko");
    otsikko.innerHTML = "Search Helsinki";
}

//  Start of the script
const finnnish = document.getElementById("finnish");
const english = document.getElementById("english");
finnnish.addEventListener("click", fin);
english.addEventListener("click", eng);