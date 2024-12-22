//history.replaceState(null, '', "/send-quiz");
const divCopy = document.querySelector("div");
const i = document.querySelector("i");

divCopy.addEventListener('click', () => {
    i.classList.remove("bi-copy");
    i.classList.add("bi-check-lg");

    setTimeout(() => {
        i.classList.add("bi-copy");
        i.classList.remove("bi-check-lg");
    }, 2000);
})