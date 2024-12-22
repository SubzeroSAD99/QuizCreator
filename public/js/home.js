const editAlt = document.querySelector("#edit-alternative");
const inpEditAlt = document.querySelector("#alt-value");
const form = document.querySelector("form");
const questionsContainer = document.querySelector("div#questions-container")


document.querySelector("#add-question").addEventListener("click", () => {
    const questions = document.querySelectorAll("input[name='question']");
    
    const hr = document.createElement("hr");
    const divQuestions = document.createElement("div");

    divQuestions.classList.add("questions");

    divQuestions.innerHTML = `
        <input type="text" name="question" placeholder="Questão ${questions.length+1}" required/>
        <div class="alternatives">
            <button type="button" class="add-alternative" id="resp${questions.length+1}" data-alt-count="0" onclick="addAlternative(this)">+ Adicionar Alternativa</button>
        </div>
    `

    questionsContainer.appendChild(hr);
    questionsContainer.appendChild(divQuestions);
})

editAlt.addEventListener("animationend", (e) => {
    if(e.animationName == "showEditAlt") inpEditAlt.focus();
    else {
        editAlt.classList.remove("showEditAlt");
        editAlt.classList.remove("hideEditAlt");
        editAlt.style.display = "none";
    }
})

document.querySelector("#save-edit").addEventListener("click", () => {
    if(!inpEditAlt.value.trim()) return hideEditAlt();

    const dataType = editAlt.getAttribute("data-type");

    if(dataType == "none") return;

    if(dataType.startsWith("create-")) {
        createAlternative(dataType.replace("create-", ""));
    } else {
        const node = document.querySelector(`#${dataType.replace("edit-", "")}`).parentNode;
    }

    hideEditAlt();
})

editAlt.addEventListener("click", (e) => {
    if(e.target == editAlt) hideEditAlt();
})


form.addEventListener("submit",async (e) => {
    e.preventDefault();
    const allQuestions = document.querySelectorAll(".questions");
    const questions = [];

    allQuestions.forEach(it => {
        const question = it.querySelector("input[name='question']").value;
        const answers = Array.from(it.querySelectorAll(".answers")).map(input => input.value);
        const correct = it.querySelector("input[name='correct']").value;

        questions.push({
            question,
            answers,
            correct
        });       
    });

    const quizData = {
        quiz: questions
    };

    try {
        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        });

        const result = await response.json();
        if(result.status == "success") window.location.href = result.redirect;
        
    } catch (error) {
        console.error("Erro ao enviar quiz");
        alert("Erro ao enviar quiz!");
    }
});


function createAlternative(childId) {
    const child = document.querySelector(`#${childId}`);
    const altCount = parseInt(child.getAttribute("data-alt-count"));
    const node = child.parentNode;

    const divAlt = document.createElement("div");
    const inpResp = document.createElement("input");
    const btnResp = document.createElement("button");
    
    inpResp.setAttribute("type", "text");
    
    if(altCount == 0) inpResp.setAttribute("name", "correct");
    else inpResp.setAttribute("name", "answers");

    child.setAttribute("data-alt-count", altCount+1);
    
    inpResp.setAttribute("readonly", "true");
    inpResp.classList.add("answers");
    inpResp.value = inpEditAlt.value;

    btnResp.innerHTML = "&check;"
    btnResp.type = "button";
    
    divAlt.appendChild(inpResp);
    divAlt.appendChild(btnResp);
    
    btnResp.addEventListener("click", () => {
        divAlt.parentNode.querySelector("input[name='correct']")?.setAttribute("name", "answers");
        inpResp.setAttribute("name", "correct");
    })

    node.appendChild(divAlt);
}


function addAlternative(btn) {
    const altCount = parseInt(btn.getAttribute("data-alt-count"));
    const btnId = btn.getAttribute("id");

    if(altCount >= 5) return alert("Limite");
    
    editAlt.setAttribute("data-type", `create-${btnId}`);
    editAlt.classList.add("showEditAlt");
}


function hideEditAlt() {
    editAlt.classList.add("hideEditAlt");
    editAlt.setAttribute("data-type", "none");
    inpEditAlt.value = "";
}