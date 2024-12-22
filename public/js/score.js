const percentage = parseInt(document.querySelector("#percentage > h2").innerText.replace("%", ""));
const msg = document.querySelector("#msg");

if(percentage <= 25) {
    msg.innerText = "Não foi dessa vez :/";
    document.documentElement.style.setProperty("--circle-color", "red");
} else if(percentage <= 50) {
    msg.innerText = "Mandou bem !";
    document.documentElement.style.setProperty("--circle-color", "orange");
} else {
    msg.innerText = "Parabéns !!!";
    document.documentElement.style.setProperty("--circle-color", "green");
} 