const apiKey = "361b4fc5";

async function Search(){
    let genre = document.getElementById("inputBox").value;
    let num = parseInt(prompt("How many movies..."));

    let arr = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}`);
    let data = await arr.json();

    if(data["Response"] === "False"){
        alert("No movies found");
        return;
    }

    let n = Math.min(num, data["Search"].length);
    DisplayCards(data, n);
}

function DisplayCards(data, n){
    for(let i = 0; i < n; i++){
        renderCards(data["Search"][i], i, data);
    }
}

async function renderCards(obj, cnt, data){

    // OUTER CARD
    let card = document.createElement("div");
    card.id = "Qcard" + cnt;
    card.style.width = "440px";
    card.style.height = "340px";
    card.style.margin = "4px";
    card.style.perspective = "1000px";

    // INNER WRAPPER
    let inner = document.createElement("div");
    inner.id = "inner" + cnt;
    inner.style.width = "100%";
    inner.style.height = "100%";
    inner.style.position = "relative";
    inner.style.transition = "transform 0.6s";
    inner.style.transformStyle = "preserve-3d";
    inner.style.transform = "rotateY(0deg)";   
    inner.style.cursor = "pointer";

    // FRONT SIDE
    let front = document.createElement("div");
    front.id = "front" + cnt;
    front.style.position = "absolute";
    front.style.width = "100%";
    front.style.height = "100%";
    front.style.border = "2px solid black";
    front.style.padding = "4px";
    front.style.boxSizing = "border-box";
    front.style.backfaceVisibility = "hidden";
    front.style.transform = "rotateY(0deg)";   

    let imgTag = document.createElement("img");

    if (obj.Poster !== "N/A") {
        imgTag.src = obj.Poster;
    }

    imgTag.style.width = "100%";
    imgTag.style.height = "100%";
    imgTag.style.objectFit = "cover";
    imgTag.style.display = "block";

    front.appendChild(imgTag);
    inner.appendChild(front);

    // BACK SIDE
    let back = document.createElement("div");
    back.id = "back" + cnt;
    back.style.position = "absolute";
    back.style.width = "100%";
    back.style.height = "100%";
    back.style.border = "2px solid black";
    back.style.display = "flex";
    back.style.alignItems = "center";
    back.style.justifyContent = "center";
    back.style.transform = "rotateY(180deg)";
    back.style.backfaceVisibility = "hidden";
    back.style.padding = "10px";
    back.style.boxSizing = "border-box";
    back.style.background = "#111";
    back.style.color = "white";

    inner.appendChild(back);
    card.appendChild(inner);

    document.getElementById("cardsSpace").appendChild(card);

    card.addEventListener("click", () => {
        flip(cnt, obj);
    });
}

async function flip(cnt, movieObj){

    let inner = document.getElementById("inner" + cnt);
    let back = document.getElementById("back" + cnt);

    let arrs = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieObj["Title"])}`
    );

    let content = await arrs.json();

    back.innerText = `Plot: ${content["Plot"]}`;

    inner.style.transform = "rotateY(180deg)";

    setTimeout(() => {
        inner.style.transform = "rotateY(0deg)";
    }, 5000);
}
