let cnt=0;

let uploadBtn = document.getElementById("uploadBtn");
let images = document.getElementById("images");
let imgHolder = document.getElementById("imgHolder");

let newImage;
let canvas = document.getElementById("imageCanvas");
let ctxt = canvas.getContext("2d");
let liveInput = document.getElementById("liveInput");
let topText="";
let bottomText="";
let activeText=null;

uploadBtn.addEventListener("click",()=>{
    images.click();
})

images.addEventListener("change",()=>{
    imgHolder.innerHTML = "";
    let imageArr = images.files;
    if(!imageArr) return;
    for(let i=0 ; i < imageArr.length ; i++){
        let img = document.createElement("img");
        img.src = URL.createObjectURL(imageArr[i]);
        img.id = "imageNum"+cnt;

        img.addEventListener("click",()=>{
            LoadToCanvas(imageArr[i]);
        });

        imgHolder.appendChild(img);
        cnt++;
    }
})  


function LoadToCanvas(image){
    newImage = document.createElement("img");
    newImage.src = URL.createObjectURL(image);
    newImage.onload = ()=>{
        canvas.width = newImage.width;
        canvas.height = newImage.height;
        drawCanvas();
    }
}


function drawCanvas(){
    ctxt.clearRect(0,0,canvas.width,canvas.height);
    ctxt.drawImage(newImage,0,0);


    ctxt.font = "bold 40px Arial";
    ctxt.textAlign = "center";
    ctxt.fillStyle = "white";
    ctxt.strokeStyle = "black";
    ctxt.lineWidth = 4;

    if(topText){
        ctxt.strokeText(topText,canvas.width / 2, 60);
        ctxt.fillText(topText, canvas.width / 2, 60);
    }

    if(bottomText){
        ctxt.strokeText(bottomText, canvas.width / 2, canvas.height - 30);
        ctxt.fillText(bottomText, canvas.width / 2, canvas.height - 30);
    }
}


canvas.addEventListener("click",(eventclick)=>{
    if (eventclick.offsetY < 100) {
        activateInput("top");
    } 
    else if (eventclick.offsetY > canvas.height - 100) {
        activateInput("bottom");
    }
    
});

function activateInput(type){
    activeText = type;
    liveInput.style.left = "0px";
    liveInput.style.width = canvas.width + "px";
    liveInput.style.display = "block";

    if (type === "top") {
        liveInput.style.top = "20px";
        liveInput.value = topText;
    } else {
        liveInput.style.top = canvas.height - 60 + "px";
        liveInput.value = bottomText;
    }

    liveInput.focus();
}

liveInput.addEventListener("input",()=>{
    if(activeText === "top"){
        topText = liveInput.value;
    }
    if(activeText === "bottom"){
        bottomText = liveInput.value;
    }

    drawCanvas();
});




document.addEventListener("click", (e) => {
    if (!canvas.contains(e.target) && e.target !== liveInput) {
        liveInput.style.display = "none";
        activeText = null;
    }
});



