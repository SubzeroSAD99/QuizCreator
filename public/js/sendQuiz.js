//history.replaceState(null, '', "/send-quiz");
const divCopy = document.querySelector("div");
const url = document.querySelector("#url")
const i = document.querySelector("i");


divCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(url.value);

    i.classList.remove("bi-copy");
    i.classList.add("bi-check-lg");

    setTimeout(() => {
        i.classList.add("bi-copy");
        i.classList.remove("bi-check-lg");
    }, 2000);
})