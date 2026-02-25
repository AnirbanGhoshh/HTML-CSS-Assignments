let cntCards = 0;
let qCards = [];

function addQs(){
    let qs = prompt("Enter your question");
    if(!qs) return;

    let ans = prompt("Enter correct answer for the question");
    if(!ans) return;

    qCards.push({
        question: qs,
        answer: ans
    });

    // OUTER CARD
    let card = document.createElement("div");
    card.id = "Qcard"+cntCards;
    card.style.width = "240px";
    card.style.height = "140px";
    card.style.margin = "2px";
    card.style.perspective = "1000px";

    // INNER WRAPPER (this rotates)
    let inner = document.createElement("div");
    inner.id = "inner"+cntCards;
    inner.style.width = "100%";
    inner.style.height = "100%";
    inner.style.position = "relative";
    inner.style.transition = "transform 0.6s";
    inner.style.transformStyle = "preserve-3d";

    // FRONT SIDE
    let front = document.createElement("div");
    front.style.position = "absolute";
    front.style.width = "100%";
    front.style.height = "100%";
    front.style.border = "2px solid black";
    front.style.padding = "4px";
    front.style.boxSizing = "border-box";
    front.style.display = "flex";
    front.style.flexDirection = "column";
    front.style.justifyContent = "space-between";
    front.style.backfaceVisibility = "hidden";

    // Question
    let question = document.createElement("div");
    question.id = "q"+cntCards;
    question.innerText = qs;
    question.style.overflowWrap = "break-word";
    question.style.overflowY = "auto";
    question.style.flex = "1";

    // Answer section
    let answerDiv = document.createElement("div");
    answerDiv.style.display = "flex";
    answerDiv.style.gap = "5px";

    let input = document.createElement("input");
    input.id = "input" + cntCards;
    input.type = "text";
    input.placeholder = "Answer..";
    input.style.flex = "1";

    let button = document.createElement("button");
    button.innerText = "submit";
    button.setAttribute("onclick" , "AnsSubmit("+cntCards+")");

    answerDiv.appendChild(input);
    answerDiv.appendChild(button);

    front.appendChild(question);
    front.appendChild(answerDiv);

    // BACK SIDE
    let back = document.createElement("div");
    back.id = "back"+cntCards;
    back.style.position = "absolute";
    back.style.width = "100%";
    back.style.height = "100%";
    back.style.border = "2px solid black";
    back.style.display = "flex";
    back.style.alignItems = "center";
    back.style.justifyContent = "center";
    back.style.transform = "rotateY(180deg)";
    back.style.backfaceVisibility = "hidden";
    back.style.padding = "4px";
    back.style.boxSizing = "border-box";

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    document.getElementById("cardsSpace").appendChild(card);

    cntCards++;
}


function AnsSubmit(cardNum){

    let inputEl = document.getElementById("input"+cardNum);
    let userAns = inputEl.value.trim().toUpperCase();
    inputEl.value = "";

    let correctAns = qCards[cardNum].answer.trim().toUpperCase();

    let inner = document.getElementById("inner"+cardNum);
    let back = document.getElementById("back"+cardNum);

    if(userAns === correctAns){
        back.style.backgroundColor = "#ADFF2F";
        back.innerText = "Hurray, correct answer";
    }
    else{
        back.style.backgroundColor = "#F08080";
        back.innerText = "Wrong answer. Correct: " + qCards[cardNum].answer;
    }

    // TRUE 3D FLIP
    inner.style.transform = "rotateY(180deg)";

    setTimeout(()=>{
        inner.style.transform = "rotateY(0deg)";
    },2000);
}
